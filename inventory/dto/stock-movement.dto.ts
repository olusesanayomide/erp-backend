import { IsString, IsInt, Min } from 'class-validator';

export class StockMovementDto {
  @IsString()
  productId: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
