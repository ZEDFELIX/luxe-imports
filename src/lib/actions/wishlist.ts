'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getWishlist() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM wishlists WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id) as Record<string, unknown>[]

  return data
}

export async function toggleWishlist(assetType: string, assetId: string) {
  if (isDemoMode()) {
    throw new Error('Wishlist is not available in demo mode')
  }

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const existing = db.prepare(
    'SELECT id FROM wishlists WHERE user_id = ? AND asset_type = ? AND asset_id = ?'
  ).get(session.id, assetType, assetId) as { id: string } | undefined

  if (existing) {
    db.prepare('DELETE FROM wishlists WHERE id = ?').run(existing.id)
    revalidatePath('/portal/wishlist')
    return { added: false }
  } else {
    const { v4: uuidv4 } = require('uuid')
    const id = uuidv4()
    db.prepare(
      'INSERT INTO wishlists (id, user_id, asset_type, asset_id) VALUES (?, ?, ?, ?)'
    ).run(id, session.id, assetType, assetId)
    revalidatePath('/portal/wishlist')
    return { added: true }
  }
}
