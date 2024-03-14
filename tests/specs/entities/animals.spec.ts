import { Animal } from 'src/entities'

describe('entities: Animal', () => {
  describe('function: hasQueryInName', () => {
    test('should return true when query is in name', () => {
      const animal = new Animal('dog')
      const result = animal.hasQueryInName('do')

      expect(result).toBe(true)
    })

    test('should return false when query is not in name', () => {
      const animal = new Animal('dog')
      const result = animal.hasQueryInName('cat')

      expect(result).toBe(false)
    })
  })
})
