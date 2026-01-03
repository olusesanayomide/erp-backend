import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });
  inventoryItem: any;

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get client() {
    return this.prisma;
  }
}
