import { Database, dataset } from 'src/repository'

describe('database', () => {
  let database: Database

  beforeEach(() => {
    database = new Database(dataset)
  })

  describe('function: getDatabase', () => {
    test('should return a database', () => {
      expect(database).toBeInstanceOf(Database)
    })

    test('should have the same dataset', () => {
      expect(database.countries).toEqual(dataset)
    })

    test('should have the same dataset', () => {
      const results = database.countPeopleAndAnimals()
      expect(results[0].name).toEqual('Dillauti [5]')
      expect(results[0].people[0].name).toEqual('Winifred Graham [6]')
    })
  })
})
