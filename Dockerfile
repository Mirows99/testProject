FROM oven/bun:1.2.12

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Build everything in the right order using Turbo
RUN bun turbo build

# Setup server
WORKDIR /app/apps/web
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["bun", "start"]