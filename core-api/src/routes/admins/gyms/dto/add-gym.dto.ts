import { IsString } from 'class-validator';

export class AddGymDto {
  @IsString()
  name!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;
}
