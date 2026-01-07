#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
pnpm prisma migrate deploy

echo "🌱 Seeding database..."
pnpm prisma db seed || echo "⚠️  Seed failed or already seeded"

echo "✅ Database ready!"

exec "$@"
