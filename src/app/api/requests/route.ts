import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  if (isDemoMode()) return NextResponse.json([])

  initDatabase()
  const db = getDb()

  const data = db.prepare(
    'SELECT * FROM sourcing_requests WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id)

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  if (isDemoMode()) throw new Error('Demo mode: creating requests is not available')

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
    body.asset_type,
    body.manufacturer || null,
    body.model || null,
    body.year || null,
    body.budget || null,
    body.preferred_origin || null,
    body.destination || null,
    body.additional_requirements || null,
  )

  const data = db.prepare('SELECT * FROM sourcing_requests WHERE id = ?').get(id)
  return NextResponse.json(data)
}
