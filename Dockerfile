# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# Install dependencies (and generate the Prisma client via postinstall)
# in their own layer so this is only re-run when deps/schema change.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# Build the app. `next build` imports every route module (even
# force-dynamic ones) while collecting page data, which evaluates
# lib/prisma.ts's top-level DATABASE_URL check. This placeholder only
# needs to satisfy that check — it's never used to connect to anything,
# and it doesn't carry over to the runner stage. The real value is
# provided at container runtime (see compose.yml).
FROM base AS builder
ARG DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
ENV DATABASE_URL=$DATABASE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
COPY . .
RUN pnpm build

# Minimal runtime image using Next.js's standalone output.
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
