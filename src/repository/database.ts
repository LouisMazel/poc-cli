import { type DatasetCountry } from './types'
import { Country } from '../entities'
import { truthyFilter } from '../utils/truthy-filter'

export class Database {
  public countries: Country[]

  constructor(data: DatasetCountry[]) {
    this.countries = data.map((country) => new Country(country.name, country.people))
  }

  getCountry(name: string) {
    return this.countries.filter((country) => country.name.includes(name))
  }

  countPeopleAndAnimals(): DatasetCountry[] {
    try {
      return this.countries.map((country) => ({
        name: `${country.name} [${country.peopleCount}]`,
        people: country.people.map((person) => ({
          name: `${person.name} [${person.animalsCount}]`,
          animals: person.animals,
        })),
      }))
    } catch (error) {
      throw new Error(`An error occurred while counting the data - ${error}`)
    }
  }

  filterByAnimalQuery(query: string): DatasetCountry[] {
    try {
      return (
        this.countries
          .map((country) => {
            const filteredPeople = country.filterPeopleByAnimalQuery(query)

            if (filteredPeople.length > 0) {
              return { name: country.name, people: filteredPeople }
            }
          })
          // eslint-disable-next-line unicorn/no-array-callback-reference
          .filter(truthyFilter)
      )
    } catch (error) {
      throw new Error(`An error occurred while filtering the data - ${error}`)
    }
  }
}
