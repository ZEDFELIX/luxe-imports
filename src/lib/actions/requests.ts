'use server'

import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createSourcingRequest(formData: {
  asset_type: string
  manufacturer?: string | null
  model?: string | null
  year?: number | null
  budget?: number | null
  preferred_origin?: string | null
  destination?: string | null
  additional_requirements?: string | null
}) {
  if (isDemoMode()) {
    throw new Error('Sourcing requests are not available in demo mode')
  }

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const id = uuidv4()
  const reference_number = `LR-${Date.now().toString(36).toUpperCase()}`

  db.prepare(`
    INSERT INTO sourcing_requests (id, reference_number, user_id, asset_type, manufacturer, model, year, budget, preferred_origin, destination, additional_requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    reference_number,
    session.id,
    formData.asset_type,
    formData.manufacturer || null,
    formData.model || null,
    formData.year || null,
    formData.budget || null,
    formData.preferred_origin || null,
    formData.destination || null,
    formData.additional_requirements || null,
  )

  const data = db.prepare('SELECT * FROM sourcing_requests WHERE id = ?').get(id) as Record<string, unknown>
  revalidatePath('/portal/requests')
  return data
}

export async function getMyRequests() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM sourcing_requests WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id) as Record<string, unknown>[]

  return data
}

export async function submitSourcingRequest(formData: Parameters<typeof createSourcingRequest>[0]) {
  return createSourcingRequest(formData)
}

export async function getAllRequests() {
  if (isDemoMode()) return []

  initDatabase()
  const db = getDb()

  const data = db.prepare(`
    SELECT sr.*, u.full_name AS user_full_name, u.email AS user_email
    FROM sourcing_requests sr
    LEFT JOIN users u ON sr.user_id = u.id
    ORDER BY sr.created_at DESC
  `).all() as Record<string, unknown>[]

  return data
}

export async function updateRequestStatus(id: string, status: string, notes?: string) {
  if (isDemoMode()) {
    throw new Error('Request updates are not available in demo mode')
  }

  initDatabase()
  const db = getDb()

  if (notes) {
    db.prepare(
      "UPDATE sourcing_requests SET status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(status, notes, id)
  } else {
    db.prepare(
      "UPDATE sourcing_requests SET status = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(status, id)
  }

  revalidatePath('/portal/requests')
  revalidatePath('/admin/requests')
}
