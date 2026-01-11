import { PurchaseModule } from './../purchase module/purchase.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InventoryModule } from 'inventory module/inventory.module';
import { ProductsModule } from 'product module/product.module';
import { OrdersModule } from 'order module/order.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [InventoryModule, ProductsModule, OrdersModule, PurchaseModule, SuppliersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
