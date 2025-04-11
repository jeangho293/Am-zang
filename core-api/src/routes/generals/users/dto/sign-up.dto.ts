import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  code!: string;

  @IsString()
  password!: string;

  @IsString()
  confirmPassword!: string;
}
