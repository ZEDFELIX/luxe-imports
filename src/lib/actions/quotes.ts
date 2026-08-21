'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getMyQuotes() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM quotes WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id) as Record<string, unknown>[]

  return data
}

export async function getAllQuotes() {
  if (isDemoMode()) return []

  initDatabase()
  const db = getDb()

  const data = db.prepare(`
    SELECT q.*, u.full_name AS user_full_name, u.email AS user_email
    FROM quotes q
    LEFT JOIN users u ON q.user_id = u.id
    ORDER BY q.created_at DESC
  `).all() as Record<string, unknown>[]

  return data
}

export async function updateQuoteStatus(id: string, status: string) {
  if (isDemoMode()) {
    throw new Error('Quote updates are not available in demo mode')
  }

  initDatabase()
  const db = getDb()

  db.prepare(
    "UPDATE quotes SET status = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(status, id)

  revalidatePath('/portal/quotes')
  revalidatePath('/admin/quotes')
}
