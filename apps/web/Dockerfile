FROM oven/bun:1.2.12 as base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root package.json and the entire packages directory
COPY package.json bun.lock .npmrc ./
COPY packages ./packages

# Copy only the web app's package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies
RUN bun install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .

# Build the app
RUN bun run build --filter=web

# Production image, copy all the files and run next
FROM oven/bun:1.2.12 AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/apps/web/next.config.ts ./
COPY --from=builder /app/apps/web/package.json ./

# Copy built app
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app
CMD ["node", "apps/web/server.js"] 