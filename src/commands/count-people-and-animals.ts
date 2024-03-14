import { type DatasetCountry, type Database } from '../repository'

export function countPeopleAndAnimals(database: Database): DatasetCountry[] | undefined {
  const results = database.countPeopleAndAnimals()

  return results.length > 0 ? results : undefined
}
