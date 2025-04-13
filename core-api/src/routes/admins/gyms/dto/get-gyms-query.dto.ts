import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetGymsQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
