# CBD Rabbit Admin

Admin panel for managing the `CBD Rabbit` store. The project is built with `Next.js 14` (`App Router`) and is used to handle orders, Instagram orders, users, and promo codes.

## Overview

- authentication via `NextAuth`:
  - `credentials` login;
  - `Google OAuth`;
  - internal `autoSignIn` provider;
- access roles: `ADMIN`, `MANAGER`;
- admin modules:
  - `orders` for regular store orders;
  - `instagram-orders` for Instagram orders;
  - `users` for user management and roles;
  - `promocodes` for promo code management;
  - `settings` for account settings;
- `MySQL` access through `Prisma`;
- UI built with `MUI`, forms powered by `react-hook-form` and `zod`;
- integrations with `Monobank`, `SendPulse`, and Google OAuth;
- media upload via `basic-ftp`.

## Tech Stack

- `Next.js 14.2`
- `React 18`
- `TypeScript`
- `Prisma`
- `NextAuth`
- `MUI`
- `Sass`
- `Jotai`

## Main Routes

- `/signIn` for sign in
- `/signUp` for sign up
- `/orders` for regular orders
- `/instagram-orders` for Instagram orders
- `/users` for user management
- `/promocodes` for promo code management
- `/settings` for account settings

The root route `/` redirects to `/orders`.

## Access Control

- only users with `ADMIN` or `MANAGER` roles can access the protected area;
- `/users` and `/promocodes` are restricted to `ADMIN`;
- unauthenticated users are redirected to `/signIn`.

Access logic is implemented in [src/middleware.ts](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/src/middleware.ts).

## Project Structure

```text
src/
  app/
    (auth)/                 sign-in and sign-up pages
    (dashboards)/           admin dashboard pages
    api/auth/               NextAuth route handler
  components/               shared UI components
  config/                   auth, theme, and app config
  hooks/                    custom hooks
  libs/
    api/                    server actions and data access layer
    client/                 Prisma client
    worker/                 worker placeholder
  types/                    types and interfaces
  utils/                    utility helpers
prisma/
  schema.prisma             Prisma schema
public/                     static assets
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local `.env` file with the required values.

Environment variables currently used in the codebase:

```env
DATABASE_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

PUBLIC_DOMAIN=
API_KEY=
IMAGE_URL=

SENDPULSE_EVENTS_URL=
SENDPULSE_API_URL=
SENDPULSE_CLIENT_ID=
SENDPULSE_CLIENT_SECRET=

MONOBANK=
```

### 3. Generate Prisma Client and sync the database schema

This repository currently does not include `Prisma` migrations, so `db push` is the practical setup flow for local development.

```bash
npx prisma generate
npx prisma db push
```

If needed, open Prisma Studio:

```bash
npx prisma studio
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

During `build`, `prisma generate` runs automatically through `prebuild`.

## Database

`Prisma` is configured to use `MySQL`.

Main entities:

- `User`
- `Order`
- `InstagramOrder`
- `OrderItem`
- `Product`
- `Promocode`
- `DeliveryInfo`
- `Loyalty`
- `Address`
- `Image`
- `Property`
- `Post`

The schema is located in [prisma/schema.prisma](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/prisma/schema.prisma).

## Authentication

Authentication config is defined in [src/config/auth.config.ts](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/src/config/auth.config.ts).

Important behavior:

- email/password login works only for users with `isVerified = true` and `isActive = true`;
- users signing in with Google are created automatically, but only non-`USER` roles can enter the admin area;
- the session stores `id`, `email`, and `role`.

## Important Technical Notes

- [src/libs/api/media.api.ts](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/src/libs/api/media.api.ts) contains hardcoded FTP credentials. These should be moved to environment variables before any shared or production use.
- The `prisma/` directory currently does not include migrations. If schema versioning is important for the team, add a proper `prisma migrate` workflow.
- [src/libs/worker/checkDeliveryStatus.ts](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/src/libs/worker/checkDeliveryStatus.ts) is currently just a placeholder.

## Before Production

- make sure all secrets and tokens are stored in environment variables;
- ensure at least one user has the `ADMIN` role;
- verify `Google OAuth`, `Monobank`, and `SendPulse` are configured correctly;
- make sure the database schema is in sync with the current [prisma/schema.prisma](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-adminka/prisma/schema.prisma).
