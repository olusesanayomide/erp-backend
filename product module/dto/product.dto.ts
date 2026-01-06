// products/dto/product.dto.ts
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'SKU of the product' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  price: number;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'SKU of the product', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ description: 'Price of the product', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
