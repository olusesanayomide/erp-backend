import { Body, Controller, Patch, Post, Param, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { createPurchaseDto } from './dto/create-purchase.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase')
@Controller()
export class PurchaseContoller {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('/Purchase Orders')
  async create(@Body() dto: createPurchaseDto) {
    return await this.purchaseService.createPurchase(dto);
  }

  @Patch(':id/receive')
  async receive(@Param('id') id: string) {
    return await this.purchaseService.recievePurchase(id);
  }

  @Get('id')
  async findOne(@Param('id') id: string) {
    return await this.purchaseService.getPurchaseDetails(id);
  }
}
