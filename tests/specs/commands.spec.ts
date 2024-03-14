import { countPeopleAndAnimals, filterByAnimalQuery } from 'src/commands'
import { type Animal } from 'src/entities'
import { type Database } from 'src/repository'
import { getDatabase } from 'src/repository/get-database'

describe('commands', () => {
  let database: Database

  beforeEach(() => {
    database = getDatabase()
  })

  describe('command: countPeopleAndAnimals', () => {
    test('should count each entities and return database with count in names', () => {
      const results = countPeopleAndAnimals(database)

      expect(results?.[0].name).toContain('[5]')
      expect(results?.[0].people[0].name).toContain('[6]')
    })
  })

  describe('command: filterByAnimalQuery', () => {
    describe('when run with "ry" query', () => {
      test('should return 2 items', () => {
        const results = filterByAnimalQuery(database, 'ry')

        expect(results).toHaveLength(2)
      })

      test('should return a result of country with people having animals that have the query in their name', () => {
        const results = filterByAnimalQuery(database, 'ry')

        const animals = results
          ?.map((country) => country.people.flatMap((person) => person.animals))
          .flat() as Animal[]

        for (const animal of animals) {
          expect(animal.name).toContain('ry')
        }
      })
    })

    describe('when run with a query with no results', () => {
      test('should return undefined', () => {
        const results = filterByAnimalQuery(database, 'rdeloihdfzeiohy')

        expect(results).toBeUndefined()
      })
    })
  })
})
