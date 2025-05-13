FROM oven/bun:1.2.12

WORKDIR /app

# Copy specific files first to improve caching
COPY package.json bun.lock* ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages ./packages

# Install dependencies
RUN bun install

# Now copy everything else
COPY . .

# Build the app
WORKDIR /app/apps/web
RUN bun run build

# Setup server config
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["bun", "start"]