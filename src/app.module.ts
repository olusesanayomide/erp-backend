import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InventoryModule } from 'inventory module/inventory.module';
import { ProductsModule } from 'product module/product.module';

@Module({
  imports: [InventoryModule, ProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
