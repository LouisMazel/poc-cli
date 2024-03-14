import { Person } from 'src/entities'

describe('entities: Person', () => {
  describe('constructor', () => {
    test('should create a person with animals', () => {
      const data = [
        {
          name: 'dog',
        },
        {
          name: 'cat',
        },
      ]
      const person = new Person('John', data)

      expect(person.animals).toHaveLength(2)
    })
  })

  describe('animalsCount', () => {
    test('should return the number of animals', () => {
      const data = [
        {
          name: 'dog',
        },
        {
          name: 'cat',
        },
      ]
      const person = new Person('John', data)

      expect(person.animalsCount).toBe(2)
    })
  })
})
