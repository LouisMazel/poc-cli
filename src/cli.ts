import { createRequire } from 'node:module'
import { printInformationCli } from './utils/print-banner'
import { runCLI } from './core/command-line-interface'
import { getDatabase } from './repository/get-database'

const nodeRequire = createRequire(import.meta.url)

const { version } = nodeRequire('../package.json')

printInformationCli(version)

const database = getDatabase()

runCLI(database, process.argv.slice(2))

export { type DatasetCountry, type DatasetAnimal, type DatasetPerson } from './repository'
