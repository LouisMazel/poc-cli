import { type DatasetAnimal } from '../repository/types'
import { Animal } from './animal'

export class Person {
  public animals: Animal[]

  constructor(
    public name: string,
    data: DatasetAnimal[],
  ) {
    this.animals = data.map((animal) => new Animal(animal.name))
  }

  public get animalsCount() {
    return this.animals.length
  }
}
