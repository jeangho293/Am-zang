import { IsNumber, IsOptional } from 'class-validator';

export class GetGymsQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
