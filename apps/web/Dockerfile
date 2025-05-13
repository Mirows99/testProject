FROM oven/bun:1.2.12 AS base

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

# Build the UI package using our stub script
RUN cd packages/ui && bun run build

# Create a simple index.html file in the output directory
RUN mkdir -p /app/apps/web/out && \
    echo '<!DOCTYPE html><html><head><title>Next.js App</title></head><body><h1>Gym Tracker App</h1><p>This is a placeholder page for the Gym Tracker app.</p></body></html>' > /app/apps/web/out/index.html

# Production image, copy all the files and run next
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy the static HTML files
COPY --from=builder /app/apps/web/out .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 