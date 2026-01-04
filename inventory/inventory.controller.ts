import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('Inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAllInventory() {
    return this.inventoryService.getInventory();
  }

  @Post('stock-in')
  async stockIn(
    @Body() body: { productId: string; warehouseId: string; quantity: number },
  ): Promise<any> {
    const { productId, warehouseId, quantity } = body;
    if (!productId || !warehouseId || quantity)
      throw new BadRequestException('Missing required fields');
    return this.inventoryService.stockIn(productId, warehouseId, quantity);
  }

  @Post('stock-out')
  async stockOut(
    @Body() body: { productId: string; warehouseId: string; quantity: number },
  ): Promise<any> {
    const { productId, warehouseId, quantity } = body;
    if (!productId || !warehouseId || quantity)
      throw new BadRequestException('Missing required fields');
    return this.inventoryService.stockOut(productId, warehouseId, quantity);
  }
}
