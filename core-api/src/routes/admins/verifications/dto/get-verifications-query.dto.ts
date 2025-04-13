import { IsNumber, IsOptional } from 'class-validator';

export class GetVerificationsQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
