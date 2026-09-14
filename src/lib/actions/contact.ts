'use server'

import { v4 as uuidv4 } from 'uuid'
import { initDatabase } from '@/lib/db/schema'
import getDb, { isDemoMode } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(formData: Parameters<typeof submitContact>[0]) {
  return submitContact(formData)
}

export async function submitContact(formData: {
  full_name: string
  email: string
  phone?: string | null
  country?: string | null
  asset_type?: string | null
  budget?: number | null
  requirements?: string | null
  preferred_contact?: string
}) {
  if (isDemoMode()) {
    return { success: true }
  }

  initDatabase()
  const db = getDb()

  const id = uuidv4()

  db.prepare(`
    INSERT INTO contact_submissions (id, full_name, email, phone, country, asset_type, budget, requirements, preferred_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    formData.full_name,
    formData.email,
    formData.phone || null,
    formData.country || null,
    formData.asset_type || null,
    formData.budget || null,
    formData.requirements || null,
    formData.preferred_contact || 'email',
  )

  revalidatePath('/contact')
  return { success: true }
}
