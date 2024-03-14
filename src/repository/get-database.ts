import { exit } from 'node:process'
import { logger } from '../utils/logger'
import { Database } from './database'
import { dataset } from './dataset'

export function getDatabase() {
  try {
    return new Database(dataset)
  } catch (error) {
    logger.error(`Could not create database - ${error.message ?? error}`)
    exit(1)
  }
}
