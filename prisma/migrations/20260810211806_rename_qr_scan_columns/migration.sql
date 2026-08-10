-- Align column names with the snake_case table name, so raw SQL does not need
-- double-quoted identifiers. Prisma cannot detect renames and generates a
-- destructive DROP/ADD pair; these RENAMEs preserve existing rows instead.

-- AlterTable
ALTER TABLE "qr_scan" RENAME COLUMN "userAgent" TO "user_agent";
ALTER TABLE "qr_scan" RENAME COLUMN "ipHash" TO "ip_hash";
ALTER TABLE "qr_scan" RENAME COLUMN "scannedAt" TO "scanned_at";

-- Indexes follow their columns automatically; rename them to match.
ALTER INDEX "qr_scan_scannedAt_idx" RENAME TO "qr_scan_scanned_at_idx";
ALTER INDEX "qr_scan_source_scannedAt_idx" RENAME TO "qr_scan_source_scanned_at_idx";
