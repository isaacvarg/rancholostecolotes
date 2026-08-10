import { after } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientIpFrom, hashIp, normalizeSource } from "@/lib/qr";

export const dynamic = "force-dynamic";

const DESTINATION = "/";
const MAX_HEADER_LENGTH = 512;

export async function GET(request: NextRequest) {
  const source = normalizeSource(request.nextUrl.searchParams.get("s"));
  const path = request.nextUrl.pathname;
  const userAgent =
    request.headers.get("user-agent")?.slice(0, MAX_HEADER_LENGTH) ?? null;
  const referer =
    request.headers.get("referer")?.slice(0, MAX_HEADER_LENGTH) ?? null;
  const ipHash = hashIp(clientIpFrom(request.headers));

  after(async () => {
    try {
      await prisma.qrScan.create({
        data: { source, path, userAgent, referer, ipHash },
      });
    } catch (error) {
      console.error("[qr] failed to log scan", { source, error });
    }
  });

  return new Response(null, {
    status: 307,
    headers: {
      Location: DESTINATION,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
