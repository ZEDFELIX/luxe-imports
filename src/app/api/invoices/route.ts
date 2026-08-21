import { NextResponse } from 'next/server'
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
    'SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC'
  ).all(session.id)

  return NextResponse.json(data)
}
