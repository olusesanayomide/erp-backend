import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InventoryModule } from 'inventory module/inventory.module';

@Module({
  imports: [InventoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
