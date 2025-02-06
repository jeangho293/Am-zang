import { IsString } from 'class-validator';

export class CreatedUserDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  confirmPassword!: string;
}
