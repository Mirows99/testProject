FROM oven/bun:1.2.12

WORKDIR /app

# Copy monorepo files
COPY . .

# Install dependencies
RUN bun install

# Build the web app
RUN bun run build --filter=web

# Setup server
ENV PORT=3000
EXPOSE 3000

# Start the app
CMD cd apps/web && bun run start