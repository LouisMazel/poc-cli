export type DatasetAnimal = {
  name: string
}

export type DatasetPerson = {
  name: string
  animals: DatasetAnimal[]
}

export type DatasetCountry = {
  name: string
  people: DatasetPerson[]
}
