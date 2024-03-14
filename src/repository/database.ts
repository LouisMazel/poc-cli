import { type DatasetCountry } from './types'
import { Country } from '../entities'

export class Database {
  public countries: Country[]

  constructor(data: DatasetCountry[]) {
    this.countries = data.map((country) => new Country(country.name, country.people))
  }

  getCountry(name: string) {
    return this.countries.filter((country) => country.name.includes(name))
  }

  countEntities(): DatasetCountry[] {
    return this.countries.map((country) => ({
      name: `${country.name} [${country.peopleCount}]`,
      people: country.people.map((person) => ({
        name: `${person.name} [${person.animalsCount}]`,
        animals: person.animals,
      })),
    }))
  }
}
