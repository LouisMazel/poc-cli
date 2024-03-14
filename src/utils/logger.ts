/* eslint-disable no-console */

export const logger = {
  clear: console.clear,
  breakline: () => console.log(''),
  line: () => console.log('--------------'),
  print: console.log,
  error: (message: string) => console.error('\u001B[31m%s\u001B[0m', `Error: ${message}`),
  warn: (message: string) => console.warn('\u001B[33m%s\u001B[0m', message),
  info: (message: string) => console.info('\u001B[34m%s\u001B[0m', message),
}

/* eslint-enable no-console */
