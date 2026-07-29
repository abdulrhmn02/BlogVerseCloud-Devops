# ====== Build Stage ======
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package*.json ./

# Install ALL dependencies (including devDeps for building)
RUN npm ci

# Copy source code
COPY . .

# ====== Production Stage ======
FROM node:18-alpine
WORKDIR /app

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/ || exit 1

# Copy only production dependencies from builder
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code from builder
COPY --from=builder /app .

# Expose port
EXPOSE 4000

# Run the app in production mode
CMD ["node", "server.js"]
