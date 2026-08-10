-- CreateTable
CREATE TABLE "qr_scan" (
    "id" TEXT NOT NULL,
    "source" VARCHAR(64),
    "path" VARCHAR(255) NOT NULL,
    "userAgent" VARCHAR(512),
    "referer" VARCHAR(512),
    "ipHash" CHAR(64),
    "scannedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qr_scan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "qr_scan_scannedAt_idx" ON "qr_scan"("scannedAt");

-- CreateIndex
CREATE INDEX "qr_scan_source_scannedAt_idx" ON "qr_scan"("source", "scannedAt");
