import { createRequire } from 'node:module'
import { printInformationCli } from './utils/print-banner'
import { runCLI } from './core/command-line-interface'
import { getDatabase } from './repository/get-database'

const nodeRequire = createRequire(import.meta.url)

const { version } = nodeRequire('../package.json')

printInformationCli(version)

export const database = getDatabase()

runCLI(database, process.argv.slice(2))

/**
 * To be used as a library without CLI (npm package)
 */
export const count = database.countPeopleAndAnimals
export const filter = database.filterByAnimalQuery

export { type DatasetCountry, type DatasetAnimal, type DatasetPerson } from './repository'
