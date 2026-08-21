'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getMyInvoices() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id) as Record<string, unknown>[]

  return data
}

export async function getAllInvoices() {
  if (isDemoMode()) return []

  initDatabase()
  const db = getDb()

  const data = db.prepare(`
    SELECT i.*, u.full_name AS user_full_name, u.email AS user_email
    FROM invoices i
    LEFT JOIN users u ON i.user_id = u.id
    ORDER BY i.created_at DESC
  `).all() as Record<string, unknown>[]

  return data
}
