import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import prismamod

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
