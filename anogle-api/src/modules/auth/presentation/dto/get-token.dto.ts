import { IsString } from 'class-validator';

export class GetTokenDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
