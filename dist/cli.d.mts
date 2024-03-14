type DatasetAnimal = {
  name: string
}
type DatasetPerson = {
  name: string
  animals: DatasetAnimal[]
}
type DatasetCountry = {
  name: string
  people: DatasetPerson[]
}

declare class Animal {
  name: string
  constructor(name: string)
  hasQueryInName(query: string): boolean
}

declare class Person {
  name: string
  animals: Animal[]
  constructor(name: string, data: DatasetAnimal[])
  get animalsCount(): number
}

declare class Country {
  name: string
  people: Person[]
  constructor(name: string, data: DatasetPerson[])
  get peopleCount(): number
  filterPeopleByAnimalQuery(query: string): Person[]
}

declare class Database {
  countries: Country[]
  constructor(data: DatasetCountry[])
  countPeopleAndAnimals(): DatasetCountry[]
  filterByAnimalQuery(query: string): DatasetCountry[]
}

declare const database: Database

declare const count: () => DatasetCountry[]
declare const filter: (query: string) => DatasetCountry[]

export { type DatasetAnimal, type DatasetCountry, type DatasetPerson, count, database, filter }
