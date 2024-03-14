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

  get peopleCount() {
    return this.people.length
  }
}
