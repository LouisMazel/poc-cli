import { createRequire } from 'node:module'
import { exit } from 'node:process'

const logger = {
  clear: console.clear,
  breakline: () => console.log(''),
  line: () => console.log('--------------'),
  print: (message) => console.log(message),
  error: (message) => console.error('\x1B[31m%s\x1B[0m', `Error: ${message}`),
  warn: (message) => console.warn('\x1B[33m%s\x1B[0m', message),
  info: (message) => console.info('\x1B[34m%s\x1B[0m', message),
}

function printInformationCli(version) {
  logger.breakline()
  logger.line()
  logger.print('Adeo-CLI')
  logger.print(`version v${version}`)
  logger.line()
  logger.breakline()
}

function countPeopleAndAnimals(database) {
  const results = database.countPeopleAndAnimals()
  return results.length > 0 ? results : void 0
}

function filterByAnimalQuery(database, query) {
  const results = database.filterByAnimalQuery(query)
  return results.length > 0 ? results : void 0
}

function parseArguments(arguments_) {
  if (arguments_.length === 0) {
    throw new Error('Please provide arguments.')
  }
  const command = arguments_[0].split('=')[0]
  const value = arguments_[0].split('=')[1]
  return { command, value }
}
function printResults(results) {
  logger.print('Results:')
  logger.breakline()
  if (results) {
    logger.print(JSON.stringify(results, void 0, 2))
  } else {
    logger.warn('No results found.')
  }
  logger.breakline()
}
function handleCommand(database, command, value) {
  let results
  switch (command) {
    case '--filter': {
      if (!value) {
        throw new Error('Please provide a value for the filter command.')
      }
      results = filterByAnimalQuery(database, value)
      break
    }
    case '--count': {
      results = countPeopleAndAnimals(database)
      break
    }
    default: {
      throw new Error('Invalid command.')
    }
  }
  return results
}
function runCLI(data, arguments_) {
  try {
    const { command, value } = parseArguments(arguments_)
    const results = handleCommand(data, command, value)
    printResults(results)
  } catch (error) {
    logger.error(error.message)
    logger.breakline()
    exit(1)
  }
}

var __defProp$3 = Object.defineProperty
var __defNormalProp$3 = (obj, key, value) =>
  key in obj
    ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
class Animal {
  constructor(name) {
    __publicField$3(this, 'name')
    this.name = name
  }
  hasQueryInName(query) {
    return this.name.includes(query)
  }
}

var __defProp$2 = Object.defineProperty
var __defNormalProp$2 = (obj, key, value) =>
  key in obj
    ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
class Person {
  constructor(name, data) {
    this.name = name
    __publicField$2(this, 'animals')
    this.animals = data.map((animal) => new Animal(animal.name))
  }
  get animalsCount() {
    return this.animals.length
  }
}

var __defProp$1 = Object.defineProperty
var __defNormalProp$1 = (obj, key, value) =>
  key in obj
    ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
class Country {
  constructor(name, data) {
    this.name = name
    __publicField$1(this, 'people')
    this.people = data.map((person) => new Person(person.name, person.animals))
  }
  get peopleCount() {
    return this.people.length
  }
  filterPeopleByAnimalQuery(query) {
    return [...this.people].filter((person) => {
      const filteredAnimals = person.animals.filter((animal) => animal.hasQueryInName(query))
      person.animals = filteredAnimals
      return filteredAnimals.length > 0
    })
  }
}

function truthyFilter(value) {
  return !!value
}

var __defProp = Object.defineProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
class Database {
  constructor(data) {
    __publicField(this, 'countries')
    this.countries = data.map((country) => new Country(country.name, country.people))
  }
  countPeopleAndAnimals() {
    try {
      return this.countries.map((country) => ({
        name: `${country.name} [${country.peopleCount}]`,
        people: country.people.map((person) => ({
          name: `${person.name} [${person.animalsCount}]`,
          animals: person.animals,
        })),
      }))
    } catch (error) {
      throw new Error(`An error occurred while counting the data - ${error}`)
    }
  }
  filterByAnimalQuery(query) {
    try {
      return this.countries
        .map((country) => {
          const filteredPeople = country.filterPeopleByAnimalQuery(query)
          if (filteredPeople.length > 0) {
            return { name: country.name, people: filteredPeople }
          }
        })
        .filter(truthyFilter)
    } catch (error) {
      throw new Error(`An error occurred while filtering the data - ${error}`)
    }
  }
}

const dataset = [
  {
    name: 'Dillauti',
    people: [
      {
        name: 'Winifred Graham',
        animals: [
          { name: 'Anoa' },
          { name: 'Duck' },
          { name: 'Narwhal' },
          { name: 'Badger' },
          { name: 'Cobra' },
          { name: 'Crow' },
        ],
      },
      {
        name: 'Blanche Viciani',
        animals: [
          { name: 'Barbet' },
          { name: 'Rhea' },
          { name: 'Snakes' },
          { name: 'Antelope' },
          { name: 'Echidna' },
          { name: 'Crow' },
          { name: 'Guinea Fowl' },
          { name: 'Deer Mouse' },
        ],
      },
      {
        name: 'Philip Murray',
        animals: [
          { name: 'Sand Dollar' },
          { name: 'Buzzard' },
          { name: 'Elephant' },
          { name: 'Xenops' },
          { name: 'Dormouse' },
          { name: 'Anchovy' },
          { name: 'Dinosaur' },
        ],
      },
      {
        name: 'Bobby Ristori',
        animals: [
          { name: 'Kowari' },
          { name: 'Caecilian' },
          { name: 'Common Genet' },
          { name: 'Chipmunk' },
          { name: 'Aardwolf' },
          { name: "Przewalski's Horse" },
          { name: 'Badger' },
          { name: 'Sand Cat' },
          { name: "Linne's Two-toed Sloth" },
        ],
      },
      {
        name: 'Louise Pinzauti',
        animals: [
          { name: 'Manta Ray' },
          { name: 'Nubian Ibex' },
          { name: 'Warbler' },
          { name: 'Duck' },
          { name: 'Mice' },
        ],
      },
    ],
  },
  {
    name: 'Tohabdal',
    people: [
      {
        name: 'Effie Houghton',
        animals: [
          { name: 'Zebra' },
          { name: 'Ring-tailed Lemur' },
          { name: 'Fly' },
          { name: 'Blue Iguana' },
          { name: 'Emu' },
          { name: 'African Wild Ass' },
          { name: 'Numbat' },
        ],
      },
      {
        name: 'Essie Bennett',
        animals: [
          { name: 'Aldabra Tortoise' },
          { name: 'Patagonian Toothfish' },
          { name: 'Giant Panda' },
          { name: 'Goat' },
          { name: 'Quahog' },
          { name: 'Collared Lemur' },
          { name: 'Aldabra Tortoise' },
        ],
      },
      {
        name: 'Owen Bongini',
        animals: [
          { name: 'Zebrashark' },
          { name: 'Dogs' },
          { name: 'Mouse' },
          { name: 'Numbat' },
          { name: 'African Wild Dog' },
        ],
      },
      {
        name: 'Alexander Fleury',
        animals: [
          { name: 'Gelada' },
          { name: 'Rattlesnake' },
          { name: 'Rabbit' },
          { name: 'Aardvark' },
          { name: 'Duck' },
          { name: 'Courser' },
          { name: 'Woodpecker' },
        ],
      },
      {
        name: 'Curtis Fuchs',
        animals: [
          { name: 'Squirrel' },
          { name: 'Falcon' },
          { name: 'Cat' },
          { name: 'Lobe Coral' },
          { name: 'Camel' },
          { name: 'Broadclub Cuttlefish' },
        ],
      },
      {
        name: 'Maud Lorenzo',
        animals: [
          { name: 'Bush Dog' },
          { name: 'Sea Urchin' },
          { name: 'Gayal' },
          { name: 'Tortoise' },
          { name: 'Meerkat' },
          { name: 'Lion' },
          { name: 'Gecko' },
        ],
      },
      {
        name: 'Linnie Lamb',
        animals: [
          { name: 'Burro' },
          { name: 'African Wild Dog' },
          { name: 'Slender Snipe Eel' },
          { name: 'Red Panda' },
          { name: 'Baby Doll Sheep' },
          { name: 'California Sea Lion' },
          { name: 'Rabbits' },
        ],
      },
      {
        name: 'Randall Beno\xEEt',
        animals: [
          { name: 'Chameleons' },
          { name: 'Bee-eater' },
          { name: 'King Vulture' },
          { name: 'Giant Isopod' },
          { name: 'Sand Cat' },
        ],
      },
    ],
  },
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Harold Patton',
        animals: [
          { name: 'Bearded Dragon' },
          { name: 'Chicken' },
          { name: 'Sand Cat' },
          { name: 'Hedgehog' },
          { name: 'Collared Lemur' },
          { name: 'Frogmouth' },
          { name: 'Raccoon dog' },
          { name: 'Shortfin Mako Shark' },
        ],
      },
      {
        name: 'Millie Lapini',
        animals: [
          { name: 'Bearded Dragon' },
          { name: 'Peafowl' },
          { name: 'Aardvark' },
          { name: 'Cows' },
          { name: 'Crane Fly' },
          { name: 'Rock Hyrax' },
          { name: 'Gerbils' },
          { name: 'Brown Bear' },
        ],
      },
      {
        name: 'Lillian Calamandrei',
        animals: [
          { name: 'Rats' },
          { name: 'Macaw' },
          { name: 'Gazelle' },
          { name: 'Gazelle' },
          { name: 'Alpaca' },
          { name: 'Snakes' },
          { name: 'Yellowjacket' },
          { name: 'Stickleback' },
        ],
      },
      {
        name: 'Lina Allen',
        animals: [
          { name: 'Rabbit' },
          { name: 'Cats' },
          { name: 'Jaguarundi' },
          { name: 'Duck' },
          { name: 'Caribbean Flamingo' },
          { name: 'Oyster' },
          { name: 'Agouti' },
        ],
      },
      {
        name: 'Georgia Hooper',
        animals: [
          { name: 'Grasshopper' },
          { name: 'Polar Bear' },
          { name: 'Rabbit' },
          { name: 'Loggerhead Turtle' },
          { name: 'Rhinoceros' },
          { name: 'African Wild Dog' },
          { name: 'Jackal' },
          { name: 'Zebu' },
        ],
      },
      {
        name: 'Lillie Abbott',
        animals: [
          { name: 'John Dory' },
          { name: 'Gayal' },
          { name: 'Hawk' },
          { name: 'Umbrella Squid' },
          { name: 'Hyrax' },
          { name: "Henkel's Leaf-tailed Gecko" },
        ],
      },
      {
        name: 'Philip Davis',
        animals: [
          { name: 'Mini Donkey' },
          { name: 'Flatback Turtle' },
          { name: 'Rabbit' },
          { name: 'Zebra' },
          { name: 'Rhea' },
          { name: 'Leafy Seadragon' },
          { name: 'Bat' },
          { name: 'Caterpillar' },
        ],
      },
    ],
  },
  {
    name: 'Zuhackog',
    people: [
      {
        name: 'Elva Baroni',
        animals: [
          { name: 'Silkworm' },
          { name: 'Zebu' },
          { name: 'King Vulture' },
          { name: 'Zebrashark' },
          { name: 'Ostrich' },
          { name: 'Waxwing' },
        ],
      },
      {
        name: 'Johnny Graziani',
        animals: [
          { name: 'Dunnart' },
          { name: 'Cotinga' },
          { name: 'Carp' },
          { name: 'Bat' },
          { name: 'Olive Sea Snake' },
          { name: 'Caterpillar' },
          { name: 'Jackal' },
        ],
      },
      {
        name: 'Herman Christensen',
        animals: [
          { name: 'Death Adder' },
          { name: 'Pronghorn' },
          { name: 'Carp' },
          { name: 'Jaguar' },
          { name: 'Anteater' },
          { name: 'Zebu' },
          { name: 'Red Ruffed Lemur' },
        ],
      },
      {
        name: 'Fannie Ancillotti',
        animals: [
          { name: 'Silkworm' },
          { name: 'Horses' },
          { name: 'Anaconda' },
          { name: 'Guinea' },
          { name: 'Bird' },
          { name: 'Aardwolf' },
          { name: 'Crane Fly' },
          { name: 'Caterpillar' },
        ],
      },
      {
        name: 'Lawrence Camiciottoli',
        animals: [
          { name: 'Bustard' },
          { name: 'Numbat' },
          { name: 'Cat' },
          { name: 'Gecko' },
          { name: 'Northern Red Snapper' },
          { name: 'Monkfish' },
          { name: 'Birds' },
          { name: 'Caterpillar' },
          { name: 'Mule' },
        ],
      },
      {
        name: 'Marion Landi',
        animals: [
          { name: 'Tortoise' },
          { name: 'Mule' },
          { name: 'Hedgehog' },
          { name: 'Geckos' },
          { name: 'Sheep' },
          { name: 'Emu' },
        ],
      },
      {
        name: 'Lou de Bruin',
        animals: [
          { name: 'Boa' },
          { name: 'Death Adder' },
          { name: 'Okapi' },
          { name: 'Fly' },
          { name: 'Horses' },
        ],
      },
    ],
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Elmer Kinoshita',
        animals: [
          { name: 'Weasel' },
          { name: 'Birds' },
          { name: 'Snakes' },
          { name: 'Anteater' },
          { name: 'Groundhog' },
          { name: 'Ant' },
          { name: 'Courser' },
        ],
      },
      {
        name: 'Cora Howell',
        animals: [
          { name: 'Rhea' },
          { name: 'Sponge' },
          { name: 'Cat' },
          { name: 'African Wild Dog' },
          { name: 'Snakes' },
          { name: 'Starling' },
          { name: 'Pronghorn' },
        ],
      },
      {
        name: 'Ernest Conte',
        animals: [
          { name: 'Bird' },
          { name: 'Colugo' },
          { name: 'Grison' },
          { name: 'Pot Bellied Pig' },
          { name: 'Asian Elephant' },
        ],
      },
      {
        name: 'Dennis Franci',
        animals: [
          { name: 'Grouse' },
          { name: 'Hapuka' },
          { name: 'Cheetah' },
          { name: 'Donkey' },
          { name: 'Turkey' },
          { name: 'Carp' },
          { name: 'Octopus' },
          { name: 'Silkworm' },
          { name: 'Bearded Dragon' },
        ],
      },
      {
        name: 'Anthony Bruno',
        animals: [
          { name: 'Caracal' },
          { name: 'Anteater' },
          { name: 'Kiwa Hirsuta' },
          { name: 'Zooplankton' },
          { name: 'Tarantula' },
          { name: 'Oryx' },
        ],
      },
    ],
  },
]

function getDatabase() {
  try {
    return new Database(dataset)
  } catch (error) {
    logger.error(`Could not create database - ${error.message ?? error}`)
    exit(1)
  }
}

const nodeRequire = createRequire(import.meta.url)
const { version } = nodeRequire('../package.json')
printInformationCli(version)
const database = getDatabase()
runCLI(database, process.argv.slice(2))
const count = database.countPeopleAndAnimals
const filter = database.filterByAnimalQuery

export { count, database, filter }
