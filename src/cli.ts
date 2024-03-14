import { createRequire } from 'node:module'
import { printInformationCli } from './utils/print-banner'
import { dataset, Database } from './repository'
import { runCLI } from './core/command-line-interface'
import { exit } from 'node:process'
import { logger } from './utils/logger'

const nodeRequire = createRequire(import.meta.url)

const { version } = nodeRequire('../package.json')

printInformationCli(version)

function getDatabase() {
  try {
    return new Database(dataset)
  } catch (error) {
    logger.error(`Could not create database - ${error.message ?? error}`)
    exit(1)
  }
}

const database = getDatabase()

runCLI(database, process.argv.slice(2))

export { type DatasetCountry, type DatasetAnimal, type DatasetPerson } from './repository'
