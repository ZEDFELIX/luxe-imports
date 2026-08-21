'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  if (isDemoMode()) {
    return {
      id: 'demo-user',
      email: 'demo@luxeimports.com',
      full_name: 'Demo Client',
      role: 'CLIENT',
      phone: null,
      country: null,
      created_at: null,
    }
  }

  const session = await getSession()
  if (!session) return null

  initDatabase()
  const db = getDb()

  const data = db.prepare('SELECT * FROM users WHERE id = ?').get(session.id) as Record<string, unknown> | undefined
  return data || null
}

export async function updateProfile(updates: {
  full_name?: string
  phone?: string
  country?: string
}) {
  if (isDemoMode()) {
    throw new Error('Profile updates are not available in demo mode')
  }

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const fields: string[] = []
  const values: unknown[] = []

  if (updates.full_name !== undefined) {
    fields.push('full_name = ?')
    values.push(updates.full_name)
  }
  if (updates.phone !== undefined) {
    fields.push('phone = ?')
    values.push(updates.phone)
  }
  if (updates.country !== undefined) {
    fields.push('country = ?')
    values.push(updates.country)
  }

  if (fields.length === 0) return { success: true }

  fields.push("updated_at = datetime('now')")
  values.push(session.id)

  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values)

  revalidatePath('/portal/profile')
  return { success: true }
}
