'use server'

import { getSession } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getMessages() {
  if (isDemoMode()) return []

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const data = db.prepare(`
    SELECT m.*,
      su.full_name AS sender_full_name,
      ru.full_name AS receiver_full_name
    FROM messages m
    LEFT JOIN users su ON m.sender_id = su.id
    LEFT JOIN users ru ON m.receiver_id = ru.id
    WHERE m.sender_id = ? OR m.receiver_id = ?
    ORDER BY m.created_at DESC
  `).all(session.id, session.id) as Record<string, unknown>[]

  return data
}

export async function sendMessage(receiverId: string, content: string, requestId?: string) {
  if (isDemoMode()) {
    throw new Error('Messaging is not available in demo mode')
  }

  const session = await getSession()
  if (!session) throw new Error('Not authenticated')

  initDatabase()
  const db = getDb()

  const { v4: uuidv4 } = require('uuid')
  const id = uuidv4()

  db.prepare(`
    INSERT INTO messages (id, sender_id, receiver_id, request_id, content)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, session.id, receiverId, requestId || null, content)

  revalidatePath('/portal/messages')
}

export async function markAsRead(messageId: string) {
  if (isDemoMode()) return

  initDatabase()
  const db = getDb()

  db.prepare('UPDATE messages SET read = 1 WHERE id = ?').run(messageId)
}
