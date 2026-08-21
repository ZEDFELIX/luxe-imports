'use server'

import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'

export async function getAllClients() {
  if (isDemoMode()) return []

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    "SELECT * FROM users WHERE role = 'CLIENT' ORDER BY created_at DESC"
  ).all() as Record<string, unknown>[]

  return data
}
