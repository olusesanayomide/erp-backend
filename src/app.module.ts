import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InventoryModule } from 'inventory module/inventory.module';
import { ProductsModule } from 'product module/product.module';
import { OrdersModule } from 'order module/order.module';

@Module({
  imports: [InventoryModule, ProductsModule, OrdersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
