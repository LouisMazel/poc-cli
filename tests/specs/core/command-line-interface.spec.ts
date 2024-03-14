/* eslint-disable sonarjs/no-duplicate-string */

import { runCLI } from 'src/core/command-line-interface'
import { type Database } from 'src/repository'
import { getDatabase } from 'src/repository/get-database'
import { logger } from 'src/utils/logger'

describe('core', () => {
  let database: Database

  beforeEach(() => {
    database = getDatabase()
  })

  describe('function: runCLI', () => {
    describe('when no arguments', () => {
      test('should run exit process and print an error message "Please provide arguments"', () => {
        const consoleErrorSpy = vi.spyOn(logger, 'error')
        try {
          runCLI(database, [])
        } catch (error) {
          expect(consoleErrorSpy).toHaveBeenCalledWith('Please provide arguments.')
          expect(error.message).toStrictEqual(expect.stringContaining('process.exit'))
        }
      })
    })

    describe('when unknown command', () => {
      test('should run exit process and print an error message "Invalid command"', () => {
        const consoleErrorSpy = vi.spyOn(logger, 'error')

        try {
          runCLI(database, ['unknown-command'])
        } catch (error) {
          expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid command.')
          expect(error.message).toStrictEqual(expect.stringContaining('process.exit'))
        }
      })
    })

    describe('when command "--filter"', () => {
      describe('without value', () => {
        test('should run exit process and print an error message to ask value', () => {
          const consoleErrorSpy = vi.spyOn(logger, 'error')

          try {
            runCLI(database, ['--filter'])
          } catch (error) {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
              'Please provide a value for the filter command.',
            )
            expect(error.message).toStrictEqual(expect.stringContaining('process.exit'))
          }
        })
      })

      describe('when run with query without results', () => {
        test('should print a warning message', () => {
          const consoleWarnSpy = vi.spyOn(logger, 'warn')

          runCLI(database, ['--filter=ryedfoiphefzdoih'])

          expect(consoleWarnSpy).toHaveBeenCalledWith('No results found.')
        })
      })

      describe('when run with query with results', () => {
        test('should print a warning message', () => {
          const consoleWarnSpy = vi.spyOn(logger, 'print')

          runCLI(database, ['--filter=Oryx'])

          expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, 'Results:')

          const resultExpected = [
            {
              name: 'Satanwi',
              people: [
                {
                  animals: [
                    {
                      name: 'Oryx',
                    },
                  ],
                  name: 'Anthony Bruno',
                },
              ],
            },
          ]

          expect(consoleWarnSpy).toHaveBeenNthCalledWith(
            2,
            JSON.stringify(resultExpected, undefined, 2),
          )
        })
      })
    })

    describe('when command "--count"', () => {
      test('should print a warning message', () => {
        const consoleWarnSpy = vi.spyOn(logger, 'print')

        runCLI(database, ['--count'])

        expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, 'Results:')

        expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, expect.stringContaining('Dillauti [5]'))
        expect(consoleWarnSpy).toHaveBeenNthCalledWith(
          2,
          expect.stringContaining('Winifred Graham [6]'),
        )
      })
    })
  })
})

/* eslint-enable sonarjs/no-duplicate-string */
