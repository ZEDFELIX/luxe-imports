'use server'

import { hashPassword, verifyPassword, createSession, deleteSession, getSession, getUserByEmail, createUser } from '@/lib/auth'
import { initDatabase } from '@/lib/db/schema'
import { isDemoMode } from '@/lib/db'

export async function login(email: string, password: string) {
  if (isDemoMode()) {
    throw new Error('Demo mode: authentication is not available')
  }

  initDatabase()
  const user = getUserByEmail(email)
  if (!user) throw new Error('Invalid email or password')

  const valid = await verifyPassword(password, user.password_hash as string)
  if (!valid) throw new Error('Invalid email or password')

  await createSession({
    id: user.id as string,
    email: user.email as string,
    full_name: user.full_name as string,
    role: user.role as string,
  })

  return { success: true, role: user.role }
}

export async function register(email: string, password: string, fullName: string) {
  if (isDemoMode()) {
    throw new Error('Demo mode: registration is not available')
  }

  initDatabase()
  const existing = getUserByEmail(email)
  if (existing) throw new Error('Email already registered')

  const hash = await hashPassword(password)
  const user = createUser(email, hash, fullName)

  await createSession({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
  })

  return { success: true }
}

export async function logout() {
  await deleteSession()
  return { success: true }
}

export async function checkSession() {
  if (isDemoMode()) {
    return { id: 'demo-admin', email: 'admin@luxeimports.com', full_name: 'Admin User', role: 'ADMIN' }
  }
  return getSession()
}
