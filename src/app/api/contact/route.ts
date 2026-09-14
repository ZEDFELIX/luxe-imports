import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (isDemoMode()) {
    return NextResponse.json({ success: true })
  }

  initDatabase()
  const db = getDb()

  const id = uuidv4()

  db.prepare(`
    INSERT INTO contact_submissions (id, full_name, email, phone, country, asset_type, budget, requirements, preferred_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    body.full_name,
    body.email,
    body.phone || null,
    body.country || null,
    body.asset_type || null,
    body.budget || null,
    body.requirements || null,
    body.preferred_contact || 'email',
  )

  return NextResponse.json({ success: true })
}
