# ⚡ Express.js + Prisma Full Backend

Express.js + TypeScript + Prisma + Swagger + JWT + Security template.

## Stack

- Express.js
- TypeScript
- Prisma ORM (PostgreSQL)
- Swagger (OpenAPI 3.0)
- JWT Authentication
- Zod Validation
- Helmet, CORS, Rate Limiting
- Bcrypt

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run in development mode
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Prisma Studio |

## API Documentation

Swagger UI: `http://localhost:3000/api/docs`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | List all users |
| GET | /users/me | Get current user |
| GET | /users/:id | Get user by ID |
| DELETE | /users/:id | Delete user |

## Project Structure

```
src/
├── index.ts
├── lib/
│   └── prisma.ts
├── routes/
│   ├── index.ts
│   ├── auth.routes.ts
│   └── users.routes.ts
├── middleware/
│   ├── errorHandler.ts
│   ├── auth.ts
│   └── validate.ts
├── utils/
│   ├── jwt.ts
│   └── hash.ts
└── schemas/
    └── auth.schema.ts
prisma/
└── schema.prisma
```
