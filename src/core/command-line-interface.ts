import { exit } from 'node:process'
import { logger } from '../utils/logger'

import { countPeopleAndAnimals, filterByAnimalQuery } from '../commands'
import { type DatasetCountry, type Database } from '../repository'

function parseArguments(arguments_: string[]) {
  if (arguments_.length === 0) {
    throw new Error('Please provide arguments.')
  }

  const command = arguments_[0].split('=')[0]
  const value = arguments_[0].split('=')[1]

  return { command, value }
}

function printResults(results: DatasetCountry[] | undefined) {
  logger.print('Results:')
  logger.breakline()

  if (results) {
    logger.print(JSON.stringify(results, undefined, 2))
  } else {
    logger.warn('No results found.')
  }

  logger.breakline()
}

function handleCommand(database: Database, command: string, value: string) {
  let results: DatasetCountry[] | undefined

  switch (command) {
    case '--filter': {
      if (!value) {
        throw new Error('Please provide a value for the filter command.')
      }

      results = filterByAnimalQuery(database, value)
      break
    }
    case '--count': {
      results = countPeopleAndAnimals(database)
      break
    }
    default: {
      throw new Error('Invalid command.')
    }
  }

  return results
}

export function runCLI(data: Database, arguments_: string[]) {
  try {
    const { command, value } = parseArguments(arguments_)

    const results = handleCommand(data, command, value)

    printResults(results)
  } catch (error) {
    logger.error(error.message)
    logger.breakline()

    exit(1)
  }
}
