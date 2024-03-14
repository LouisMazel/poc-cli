# ADEO-CLI

## Pre-requisites

- Node.js 21.0.0 or higher
- PNPM 8.0.0 or higher

## Installation

Install the dependencies, run:

```bash
pnpm install
```

## Usage

### Run built CLI

```bash
pnpm build && pnpm start
```

### Run CLI with Typescript (development)

```bash
pnpm cli
```

## Commands

### Filtering database by animal name pattern

Use the flag `--filter={pattern}` to filter the database by animal names that match the pattern.

```bash
node app.js --filter=ry

Results:

[
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Lillie Abbott',
        animals: [
          {
            name: 'John Dory'
          }
        ]
      }
    ]
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Anthony Bruno',
        animals: [
          {
            name: 'Oryx'
          }
        ]
      }
    ]
  }
]
```

### Count

Use the flag `--count` to count the number in each country and the number of animals each person has.

```bash
node app.js --count

Results:

[ { name: 'Dillauti [5]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] },
      ...
...
]
```

## Development

### Lint and format code

> ESLint is used to lint the code.

To lint the code, run:

```bash
pnpm lint
```

To format the code with prettier, run:

```bash
pnpm format
```

### Test

> Vitest is used to run the tests.

To run the tests, run:

```bash
pnpm test
```

## Release new version

> Use lerna and changelogen

To release a new version, run:

```bash
pnpm release
```

This command will:

- Bump the version in the `package.json` file
- Create a new tag in the repository
- Push the new tag to the repository
- Generate a new release in the CHANGELONG.md file
- Publish this release in the repository
