import { IsString } from 'class-validator';

export class SignInLocalDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
