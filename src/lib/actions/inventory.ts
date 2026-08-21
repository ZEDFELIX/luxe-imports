'use server'

import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants'

export async function getInventory(category: string) {
  if (isDemoMode()) {
    if (category === 'aircraft') return DEMO_AIRCRAFT as unknown as Record<string, unknown>[]
    if (category === 'marine') return DEMO_MARINE as unknown as Record<string, unknown>[]
    return DEMO_VEHICLES as unknown as Record<string, unknown>[]
  }

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM vehicles WHERE category = ? ORDER BY created_at DESC'
  ).all(category) as Record<string, unknown>[]

  return data
}

export async function getAllInventory() {
  if (isDemoMode()) {
    return [
      ...DEMO_VEHICLES,
      ...DEMO_AIRCRAFT,
      ...DEMO_MARINE,
    ] as unknown as Record<string, unknown>[]
  }

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM vehicles ORDER BY created_at DESC'
  ).all() as Record<string, unknown>[]

  return data
}
