import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const failedAttempts = new Map<string, { count: number; resetTime: number }>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, value] of failedAttempts.entries()) {
    if (now > value.resetTime) {
      failedAttempts.delete(key);
    }
  }
}

function isRateLimited(ip: string): boolean {
  cleanupExpiredEntries();

  const entry = failedAttempts.get(ip);
  if (!entry) return false;

  if (Date.now() > entry.resetTime) {
    failedAttempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const entry = failedAttempts.get(ip);
  const now = Date.now();

  if (!entry || now > entry.resetTime) {
    failedAttempts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    entry.count++;
  }
}

function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function proxy(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
      },
    });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [, encoded] = authHeader.split(" ");
    const decoded = atob(encoded);
    const [username, password] = decoded.split(":");

    const validUsername = process.env.ADMIN_USERNAME ?? "";
    const validPassword = process.env.ADMIN_PASSWORD ?? "";

    if (
      timingSafeEqual(username, validUsername) &&
      timingSafeEqual(password, validPassword)
    ) {
      clearFailedAttempts(ip);
      return NextResponse.next();
    }

    recordFailedAttempt(ip);
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
