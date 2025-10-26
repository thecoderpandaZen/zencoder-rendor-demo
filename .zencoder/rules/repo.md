---
description: Repository Information Overview
alwaysApply: true
---

# Task Management API Information

## Summary
A production-ready task management API built with Express, TypeScript, and PostgreSQL. The API includes JWT authentication, database migrations, and comprehensive error handling. The project appears to be in an early stage of development or serves as a template/boilerplate with the directory structure in place but many directories currently empty.

## Structure
- **src/**: Main source code directory
  - **__tests__/**: Test files location (currently empty)
  - **config/**: Configuration files (currently empty)
  - **controllers/**: API controllers (currently empty)
  - **database/**: Database connection and migrations
  - **middleware/**: Express middleware (currently empty)
  - **models/**: Data models (currently empty)
  - **routes/**: API route definitions (currently empty)
  - **services/**: Business logic services (currently empty)
  - **types/**: TypeScript type definitions (currently empty)
  - **utils/**: Utility functions (currently empty)
  - **index.ts**: Application entry point

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.4.5
**Build System**: tsc (TypeScript Compiler)
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- express: ^4.21.2 (Web framework)
- knex: ^3.1.0 (SQL query builder)
- pg: ^8.16.3 (PostgreSQL client)
- bcrypt: ^5.1.1 (Password hashing)
- jsonwebtoken: ^9.0.2 (JWT authentication)
- joi: ^17.13.3 (Data validation)
- winston: ^3.18.3 (Logging)
- helmet: ^7.2.0 (Security headers)
- compression: ^1.8.1 (Response compression)
- cors: ^2.8.5 (CORS support)
- dotenv: ^16.6.1 (Environment variables)
- express-rate-limit: ^7.5.1 (Rate limiting)

**Development Dependencies**:
- jest: ^29.7.0 (Testing framework)
- ts-jest: ^29.1.2 (TypeScript support for Jest)
- supertest: ^6.3.4 (HTTP testing)
- eslint: ^8.57.0 (Linting)
- tsx: ^4.7.2 (TypeScript execution)

## Build & Installation
```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database
**Type**: PostgreSQL
**ORM/Query Builder**: Knex.js
**Migrations**: Available via Knex
**Connection**: Configurable via environment variables

**Migration Commands**:
```bash
# Create a new migration
npm run migrate:make <migration_name>

# Run migrations
npm run migrate:latest

# Rollback migrations
npm run migrate:rollback

# Create a seed file
npm run seed:make <seed_name>

# Run seed files
npm run seed:run
```

## Testing
**Framework**: Jest with ts-jest
**Test Location**: src/__tests__/
**Run Command**:
```bash
# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

## Environment Configuration
**Configuration File**: .env (from .env.example template)
**Key Variables**:
- NODE_ENV: Environment (development/production/test)
- PORT: Server port (default: 3000)
- DATABASE_URL: PostgreSQL connection string
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD: Database connection details
- JWT_SECRET: Secret for JWT token signing
- JWT_EXPIRES_IN: JWT token expiration
- RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS: Rate limiting configuration
- CORS_ORIGIN: Allowed CORS origin