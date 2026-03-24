// lib/auth.ts
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production-minimum-64-characters-long-string-for-security-purposes-only'
const JWT_EXPIRES_IN = '24h'
const REFRESH_EXPIRES_IN = '7d'
const BCRYPT_ROUNDS = 12

export interface TokenPayload {
  userId: string
  role: string
  email?: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateTokens(payload: TokenPayload): TokenPair {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'tea-shop-boilerplate',
    audience: 'tea-shop-users'
  })

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
    issuer: 'tea-shop-boilerplate',
    audience: 'tea-shop-users'
  })

  return { accessToken, refreshToken }
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'tea-shop-boilerplate',
      audience: 'tea-shop-users'
    })
    return decoded as TokenPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload
  } catch {
    return null
  }
}

export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7)
}