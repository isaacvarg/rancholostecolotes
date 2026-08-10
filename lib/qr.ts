import { createHash } from "node:crypto";

const MAX_SOURCE_LENGTH = 64;

// thee endpoint is public and unauthenticated, so anything can arrive here. 
// junk goes to null rather than adding a garbage row
export function normalizeSource(raw: string | null): string | null {
  if (!raw) return null;

  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SOURCE_LENGTH)
    // Truncation can leave a trailing separator behind.
    .replace(/-+$/, "");

  return slug || null;
}

// best effort client ip
// these are used for unique can counts, not for access control
export function clientIpFrom(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return headers.get("x-real-ip")?.trim() || null;
}

// salted and hashed ip
export function hashIp(ip: string | null): string | null {
  const salt = process.env.QR_SCAN_IP_SALT;
  if (!ip || !salt) return null;

  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
