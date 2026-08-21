'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getMyShipments() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM shipments WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id) as Record<string, unknown>[]

  return data
}

export async function getAllShipments() {
  if (isDemoMode()) return []

  initDatabase()
  const db = getDb()

  const data = db.prepare(`
    SELECT s.*, u.full_name AS user_full_name, u.email AS user_email
    FROM shipments s
    LEFT JOIN users u ON s.user_id = u.id
    ORDER BY s.created_at DESC
  `).all() as Record<string, unknown>[]

  return data
}

export async function updateShipmentStatus(id: string, status: string) {
  if (isDemoMode()) {
    throw new Error('Shipment updates are not available in demo mode')
  }

  initDatabase()
  const db = getDb()

  db.prepare(
    "UPDATE shipments SET status = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(status, id)

  revalidatePath('/portal/shipments')
  revalidatePath('/admin/shipments')
}
