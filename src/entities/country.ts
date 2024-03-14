import { type DatasetPerson } from '../repository/types'
import { Person } from './person'

export class Country {
  public people: Person[]

  constructor(
    public name: string,
    data: DatasetPerson[],
  ) {
    this.people = data.map((person) => new Person(person.name, person.animals))
  }

  public get peopleCount() {
    return this.people.length
  }

  public filterPeopleByAnimalQuery(query: string) {
    return [...this.people].filter((person) => {
      const filteredAnimals = person.animals.filter((animal) => animal.hasQueryInName(query))

      person.animals = filteredAnimals

      return filteredAnimals.length > 0
    })
  }
}
