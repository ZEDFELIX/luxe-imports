import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  if (isDemoMode()) {
    return NextResponse.json({
      clients: 0,
      requests: 0,
      quotes: 0,
      shipments: 0,
      invoices: 0,
    })
  }

  initDatabase()
  const db = getDb()

  const profile = db.prepare('SELECT role FROM users WHERE id = ?').get(session.id) as { role: string } | undefined

  if (profile?.role !== 'ADMIN' && profile?.role !== 'STAFF') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clients = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'CLIENT'").get() as { count: number }).count
  const requests = (db.prepare('SELECT COUNT(*) as count FROM sourcing_requests').get() as { count: number }).count
  const quotes = (db.prepare('SELECT COUNT(*) as count FROM quotes').get() as { count: number }).count
  const shipments = (db.prepare('SELECT COUNT(*) as count FROM shipments').get() as { count: number }).count
  const invoices = (db.prepare('SELECT COUNT(*) as count FROM invoices').get() as { count: number }).count

  return NextResponse.json({
    clients,
    requests,
    quotes,
    shipments,
    invoices,
  })
}
