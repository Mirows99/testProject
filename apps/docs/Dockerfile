FROM oven/bun:1.2.12

WORKDIR /app

# Copy monorepo files
COPY . .

# Install dependencies
RUN bun install

# Build the docs app
RUN bun run build --filter=docs

# Setup server
ENV PORT=3001
EXPOSE 3001

# Start the app
CMD cd apps/docs && bun run start 