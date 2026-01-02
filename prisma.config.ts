// prisma.config.ts
import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { PrismaClient } from '@prisma/client/extension';

export const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL },
});
