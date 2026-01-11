import { drizzle } from 'drizzle-orm/bun-sql'
import * as schema from './schema.ts'
import { sql as client } from './bun.ts'

export const db = drizzle({
  schema,
  client,
  casing: 'snake_case',
})
