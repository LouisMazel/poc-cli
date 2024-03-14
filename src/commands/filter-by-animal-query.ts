import { type DatasetCountry, type Database } from '../repository'

export function filterByAnimalQuery(
  database: Database,
  query: string,
): DatasetCountry[] | undefined {
  const results = database.filterByAnimalQuery(query)

  return results.length > 0 ? results : undefined
}
