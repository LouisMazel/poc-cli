export class Animal {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public hasQueryInName(query: string) {
    return this.name.includes(query)
  }
}
