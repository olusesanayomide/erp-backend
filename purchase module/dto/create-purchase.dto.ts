import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class PurchaseItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
  unitPrice: number;
}
export class createPurchaseDto {
  @ApiProperty({})
  @IsString()
  purchaseOrder: string;

  @ApiProperty({})
  @IsString()
  warehouseId: string;

  @ApiProperty({ example: 1, description: 'ID of the supplier' })
  @IsNumber()
  supplierId: string;

  @ApiProperty({ example: '2023-01-01', description: 'Date of the purchase' })
  @IsDate()
  purchaseDate: Date;

  @ApiProperty({
    example: 1500.75,
    description: 'Total amount of the purchase',
  })
  @IsNumber()
  totalAmount: number;

  items: PurchaseItemDto[];
}
