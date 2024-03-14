/* eslint-disable unicorn/prefer-top-level-await */

import { exec } from 'node:child_process'
import { existsSync, promises as fsp } from 'node:fs'
import {
  generateMarkDown,
  getGitDiff,
  parseCommits,
  loadChangelogConfig,
  syncGithubRelease,
} from 'changelogen'

const nodeRequire = createRequire(import.meta.url)

const { version } = nodeRequire('./lerna.json')

import { logger } from './src/utils/logger'
import { createRequire } from 'node:module'

async function execPromise(command: string): Promise<{ stdout: string; stderr: string }> {
  return await new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`🔴 [cli](${command}) Execution failed - ${error.message}.`)
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

async function updateChangelog() {
  // const { stdout: penultimateTag } = await execPromise("git tag --sort=-v:refname | sed -n '2p'")
  const { stdout: previousTag } = await execPromise("git tag --sort=-v:refname | sed -n '1p'")
  const previousTagTrimed = previousTag.trim()

  const newTag = `v${version.trim()}`

  await execPromise(`git tag ${newTag}`)
  await execPromise(`git push origin ${newTag}`)

  logger.print('Tag pushed to GitHub.')
  logger.breakline()

  const config = await loadChangelogConfig(process.cwd(), {
    from: previousTagTrimed,
    to: newTag,
  })

  const rawCommits = await getGitDiff(previousTagTrimed, newTag)
  const commits = parseCommits(rawCommits, config).filter((commit) => {
    return (
      config.types[commit.type] &&
      !(commit.type === 'chore' && ['release'].includes(commit.scope) && !commit.isBreaking)
    )
  })

  const newChangelog = await generateMarkDown(commits, config)

  let changelogMD: string

  changelogMD =
    typeof config.output === 'string' && existsSync(config.output)
      ? await fsp.readFile(config.output, 'utf8')
      : '# Changelog\n\n'

  const lastEntry = changelogMD.match(/^###?\s+.*$/m)

  if (lastEntry) {
    changelogMD =
      changelogMD.slice(0, lastEntry.index) +
      newChangelog +
      '\n\n' +
      changelogMD.slice(lastEntry.index)
  } else {
    changelogMD += '\n' + newChangelog + '\n\n'
  }

  await fsp.writeFile(config.output as string, changelogMD)

  await execPromise('pnpm format')

  const changelogWithoutTitle = newChangelog.split('\n').slice(2).join('\n')

  await execPromise(`git add -u`)
  await execPromise(`git commit -m "chore(release): bump version to ${newTag}"`)
  await execPromise(`git push origin HEAD`)

  try {
    await syncGithubRelease(config, {
      version: newTag.replace('v', ''),
      body: changelogWithoutTitle,
    })

    logger.breakline()
    logger.print('Release pushed to GitHub.')
    logger.breakline()
  } catch (error) {
    logger.error(error.message ?? error)
  }
}

updateChangelog()

/* eslint-enable unicorn/prefer-top-level-await */
