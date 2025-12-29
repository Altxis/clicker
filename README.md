# Clicker Monorepo

A full-stack application with NestJS backend and Next.js frontend.

## Tech Stack

- **Backend**: NestJS, Prisma, PostgreSQL, Redis, WebSocket
- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Package Manager**: pnpm
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose

### Installation

```bash
# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL, Redis)
pnpm docker:up

# Run database migrations
cd apps/backend
pnpm prisma migrate dev

# Start development servers
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start both backend and frontend in development mode
- `pnpm dev:backend` - Start backend only
- `pnpm dev:frontend` - Start frontend only
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm docker:up` - Start Docker containers
- `pnpm docker:down` - Stop Docker containers
- `pnpm docker:logs` - View Docker logs

## Project Structure

```
clicker/
├── apps/
│   ├── backend/          # NestJS backend
│   └── frontend/         # Next.js frontend
├── packages/             # Shared packages (optional)
├── docker-compose.yml
└── pnpm-workspace.yaml
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clicker"
REDIS_URL="redis://localhost:6379"
PORT=3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```
