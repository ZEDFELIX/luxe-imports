'use server'

import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'

export async function getAdminDashboard() {
  if (isDemoMode()) {
    return {
      totalClients: 0,
      totalRequests: 0,
      pendingQuotes: 0,
      activeShipments: 0,
      recentRequests: [] as Record<string, unknown>[],
      recentMessages: [] as Record<string, unknown>[],
    }
  }

  initDatabase()
  const db = getDb()

  const totalClients = (db.prepare(
    "SELECT COUNT(*) as count FROM users WHERE role = 'CLIENT'"
  ).get() as { count: number }).count

  const totalRequests = (db.prepare(
    'SELECT COUNT(*) as count FROM sourcing_requests'
  ).get() as { count: number }).count

  const pendingQuotes = (db.prepare(
    "SELECT COUNT(*) as count FROM quotes WHERE status = 'PENDING'"
  ).get() as { count: number }).count

  const activeShipments = (db.prepare(
    "SELECT COUNT(*) as count FROM shipments WHERE status IN ('IN_TRANSIT', 'CUSTOMS')"
  ).get() as { count: number }).count

  const recentRequests = db.prepare(`
    SELECT sr.*, u.full_name AS user_full_name, u.email AS user_email
    FROM sourcing_requests sr
    LEFT JOIN users u ON sr.user_id = u.id
    ORDER BY sr.created_at DESC
    LIMIT 5
  `).all() as Record<string, unknown>[]

  const recentMessages = db.prepare(`
    SELECT m.*,
      su.full_name AS sender_full_name,
      ru.full_name AS receiver_full_name
    FROM messages m
    LEFT JOIN users su ON m.sender_id = su.id
    LEFT JOIN users ru ON m.receiver_id = ru.id
    ORDER BY m.created_at DESC
    LIMIT 5
  `).all() as Record<string, unknown>[]

  return {
    totalClients,
    totalRequests,
    pendingQuotes,
    activeShipments,
    recentRequests,
    recentMessages,
  }
}
