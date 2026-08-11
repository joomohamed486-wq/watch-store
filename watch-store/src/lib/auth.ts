import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types"; // أنشئ هذا الملف أو استبدله

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: unknown) {
  return await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, { clockTolerance: 60 });
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const result = await db.queryOne<{
    id: string;
    email: string;
    name: string | null;
    role: string;
  }>(
    `SELECT id, email, name, role FROM users WHERE id = $1`,
    [userId]
  );

  if (!result) return null;

  const user = {
    id: result.id,
    email: result.email,
    name: result.name,
    role: result.role as UserRole,
  };

  const session = await encrypt(user);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return user;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function isAdmin(role: UserRole): boolean {
  return role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN;
}

export function isStaff(role: UserRole): boolean {
  return role === UserRole.STAFF;
}
