import { PurchaseModule } from './../purchase module/purchase.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InventoryModule } from 'inventory module/inventory.module';
import { ProductsModule } from 'product module/product.module';
import { OrdersModule } from 'order module/order.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt.guard';
import { RolesGuard } from './auth/guard/role.guard';

@Module({
  imports: [
    InventoryModule,
    ProductsModule,
    OrdersModule,
    PurchaseModule,
    SuppliersModule,
    WarehousesModule,
    CustomersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
