import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const COOKIE_NAME = "admin_session";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "password";
const AUTH_FILE = path.join(process.cwd(), "data", "admin-auth.json");
const TMP_AUTH_FILE = "/tmp/admin-auth.json";

interface AdminAuthRecord {
  username: string;
  passwordHash: string;
}

function envValue(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getUsername(): string {
  return envValue("ADMIN_USERNAME") ?? DEFAULT_USERNAME;
}

function getPassword(): string {
  return envValue("ADMIN_PASSWORD") ?? DEFAULT_PASSWORD;
}

function getSecret(): Uint8Array {
  const secret = `${getUsername()}:${getPassword()}`;
  return new TextEncoder().encode(secret + "_jwt_secret_key");
}

async function readAuthFile(filePath: string): Promise<AdminAuthRecord | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as AdminAuthRecord;
  } catch {
    return null;
  }
}

async function getStoredAuth(): Promise<AdminAuthRecord | null> {
  if (process.env.VERCEL) {
    const tmp = await readAuthFile(TMP_AUTH_FILE);
    if (tmp) return tmp;
  }
  return readAuthFile(AUTH_FILE);
}

async function saveStoredAuth(record: AdminAuthRecord): Promise<void> {
  const json = JSON.stringify(record, null, 2);

  if (process.env.VERCEL) {
    await fs.writeFile(TMP_AUTH_FILE, json, "utf-8");
    return;
  }

  await fs.mkdir(path.dirname(AUTH_FILE), { recursive: true });
  await fs.writeFile(AUTH_FILE, json, "utf-8");
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const stored = await getStoredAuth();
  if (stored) {
    return username === stored.username && bcrypt.compare(password, stored.passwordHash);
  }

  return username === getUsername() && password === getPassword();
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  username = getUsername()
): Promise<boolean> {
  if (!(await verifyCredentials(username, currentPassword))) {
    return false;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await saveStoredAuth({ username, passwordHash });
  return true;
}

export async function createSession(): Promise<string> {
  return new SignJWT({ role: "admin", username: getUsername() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySession(token);
}

export { COOKIE_NAME };
