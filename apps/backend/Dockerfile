# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install OpenSSL and pnpm
RUN apk add --no-cache openssl
RUN npm install -g pnpm

# Copy package files
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Generate Prisma Client
RUN pnpm prisma generate

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files for builder stage
COPY package.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies for build
RUN pnpm install --no-frozen-lockfile

# Generate Prisma Client
RUN pnpm prisma generate

# Copy all source files and configs
COPY . .

# Build application
RUN pnpm build

# Debug: Check what was built
RUN echo "=== Contents of /app ===" && ls -la /app/
RUN echo "=== Contents of /app/dist ===" && ls -la /app/dist/ || echo "dist directory not found"

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Install OpenSSL and pnpm
RUN apk add --no-cache openssl
RUN npm install -g pnpm

# Copy necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Verify dist was copied
RUN ls -la /app/
RUN ls -la /app/dist/

EXPOSE 3001

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start:prod"]
