FROM oven/bun:1.2.12 as base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files (from apps/web directory)
COPY package.json ./
# Copy only what you need
# COPY ../../packages ./packages  # This won't work in Docker context

# Install dependencies
RUN bun install

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN bun run build

# Production image
FROM oven/bun:1.2.12 AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

# Copy built app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app
CMD ["node", "server.js"]