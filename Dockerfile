FROM oven/bun:1.2.12

WORKDIR /app

# Copy everything needed for the UI package
COPY package.json bun.lock .npmrc ./
COPY packages ./packages

# Install dependencies
RUN bun install

# Build UI package first
WORKDIR /app/packages/ui
RUN bun run build

# Create app directory structure
RUN mkdir -p /app/apps/web/public

# Create a simple HTML page
RUN echo '<!DOCTYPE html><html><head><title>Gym Tracker</title><style>body{font-family:system-ui;background:#000;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}.container{text-align:center;max-width:800px;}</style></head><body><div class="container"><h1>Gym Tracker App</h1><p>Successfully deployed with Coolify</p></div></body></html>' > /app/apps/web/public/index.html

# Create a simple Node.js server
RUN echo 'const http = require("http"); const fs = require("fs"); const path = require("path"); const server = http.createServer((req, res) => { res.writeHead(200, {"Content-Type": "text/html"}); res.end(fs.readFileSync(path.join(__dirname, "public/index.html"))); }); server.listen(process.env.PORT || 3000, () => { console.log(`Server running on port ${process.env.PORT || 3000}`); });' > /app/apps/web/server.js

# Setup server
WORKDIR /app/apps/web
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["node", "server.js"]