import { Country } from 'src/entities'

describe('entities: Country', () => {
  describe('constructor', () => {
    test('should create a country with people', () => {
      const data = [
        {
          name: 'John',
          animals: [
            {
              name: 'dog',
            },
            {
              name: 'cat',
            },
          ],
        },
        {
          name: 'Jane',
          animals: [
            {
              name: 'fish',
            },
            {
              name: 'bird',
            },
          ],
        },
      ]
      const country = new Country('USA', data)

      expect(country.people).toHaveLength(2)
    })
  })

  describe('animalsCount', () => {
    test('should return the number of animals', () => {
      const data = [
        {
          name: 'John',
          animals: [
            {
              name: 'dog',
            },
            {
              name: 'cat',
            },
          ],
        },
        {
          name: 'Jane',
          animals: [
            {
              name: 'fish',
            },
            {
              name: 'bird',
            },
          ],
        },
      ]
      const country = new Country('USA', data)

      expect(country.peopleCount).toBe(2)
      expect(country.filterPeopleByAnimalQuery('fish')).toEqual([
        {
          name: 'Jane',
          animals: [
            {
              name: 'fish',
            },
          ],
        },
      ])
    })
  })
})
