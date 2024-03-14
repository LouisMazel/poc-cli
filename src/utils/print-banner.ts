import { logger } from './logger'

export function printInformationCli(version: string): void {
  logger.breakline()
  logger.line()
  logger.print('Adeo-CLI')
  logger.print(`version v${version}`)
  logger.line()
  logger.breakline()
}
