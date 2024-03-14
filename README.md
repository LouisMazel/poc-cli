<h1>ADEO-CLI</h1>

<h2>Table of Contents</h2>

- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Run the built CLI](#run-the-built-cli)
  - [Run CLI with Typescript (development)](#run-cli-with-typescript-development)
- [Commands](#commands)
  - [Filtering database by animal name pattern](#filtering-database-by-animal-name-pattern)
  - [Count](#count)
- [Development](#development)
  - [Run the CLI](#run-the-cli)
  - [Build](#build)
  - [Lint and format code](#lint-and-format-code)
  - [Test](#test)
- [Release new version](#release-new-version)
- [Code and commit quality](#code-and-commit-quality)
  - [Dependencies](#dependencies)
  - [Hooks](#hooks)
  - [Tools](#tools)
- [Continuous Integration](#continuous-integration)

## Pre-requisites

- Node.js 21.0.0 or higher
- PNPM 8.0.0 or higher

## Installation

Install the dependencies, run:

```bash
pnpm install
```

## Usage

### Run the built CLI

```bash
pnpm start [--filter=ry] [--count]
# or node dist/cli.mjs [--filter=ry] [--count]
```

### Run CLI with Typescript (development)

```bash
pnpm dev [--filter=ry] [--count]
```

## Commands

### Filtering database by animal name pattern

Use the flag `--filter={pattern}` to filter the database by animal names that match the pattern.

```bash
# command:

node dist/cli.mjs --filter=ry

# output:

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
# command:

node dist/cli.mjs --count

# output:

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

### Run the CLI

To run the CLI with Typescript, run:

```bash
pnpm dev [--filter=ry] [--count]
```

### Build

> Unbuild is used to build the project.

To build the project, run:

```bash
pnpm build
```

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

To run the tests with coverage, run:

```bash
pnpm test:coverage
```

Then, open the file `coverage/index.html` in your browser.

## Release new version

> Use lerna and changelogen

To release a new version, run:

```bash
pnpm release
```

This command will:

- Bump the version in the `package.json` file according to the conventional commits and the semver rules
- Create a new tag in the repository
- Push the new tag to the repository
- Generate a new release in the CHANGELONG.md file
- Publish this release in the repository

## Code and commit quality

### Dependencies

- The dependabot is used to keep the dependencies up to date (open pull requests to update the dependencies).

### Hooks

> Handle with Husky

On each commit, the following hooks are executed:

- Run typescript to check for errors
- Format the code
- Lint the code
- Lint the commit message format with commitlint

### Tools

- Prettier is used to format the code.
- ESLint is used to lint the code.
- Commitlint and husky are used to enforce the commit message format.

## Continuous Integration

> Use Github Actions

On each pull request to the "main" branch, the following actions are executed and should pass to be merged:

- Run the tests
- Lint the code
- Build the app to check for errors
