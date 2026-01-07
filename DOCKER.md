# Clicker App - Docker Setup

## Development Environment

Run the entire development environment with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will start:

- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend NestJS with hot reload (port 3001, debug port 9229)
- Frontend Next.js with hot reload (port 3000)

The backend will automatically run migrations and seed the database on startup.

**Hot reload:** Changes to `src/` files will automatically reload the services.

### Stop Development Environment

```bash
docker-compose -f docker-compose.dev.yml down
```

### Clean Development Environment (removes volumes)

```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Rebuild After Package Changes

If you add/remove packages, rebuild the images:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Production Environment

Build and run the production environment:

```bash
docker-compose up --build
```

This will start optimized production builds of all services.

### Stop Production Environment

```bash
docker-compose down
```

## Useful Commands

### View logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
```

### Rebuild specific service

```bash
docker-compose -f docker-compose.dev.yml up --build backend
docker-compose -f docker-compose.dev.yml up --build frontend
```

### Access database

```bash
docker exec -it clicker-postgres-dev psql -U postgres -d clicker
```

### Access Redis CLI

```bash
docker exec -it clicker-redis-dev redis-cli
```

## Notes

- Development uses volume mounts for hot reload
- Production uses multi-stage builds for optimization
- Backend runs migrations automatically on startup
- Default credentials: postgres/postgres (change in production!)
