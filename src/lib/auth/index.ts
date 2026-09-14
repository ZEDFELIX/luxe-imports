import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import getDb from '@/lib/db';
import { initDatabase } from '@/lib/db/schema';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'luxe-imports-secret-key-change-in-production'
);

const COOKIE_NAME = 'luxe-session';

export interface SessionUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      full_name: payload.full_name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function getUserByEmail(email: string) {
  initDatabase();
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as Record<string, unknown> | undefined;
}

export function getUserById(id: string) {
  initDatabase();
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown> | undefined;
}

export function createUser(email: string, passwordHash: string, fullName: string) {
  initDatabase();
  const db = getDb();
  const id = uuidv4();
  db.prepare(
    'INSERT INTO users (id, email, password_hash, full_name) VALUES (?, ?, ?, ?)'
  ).run(id, email, passwordHash, fullName);
  return { id, email, full_name: fullName, role: 'CLIENT' };
}
