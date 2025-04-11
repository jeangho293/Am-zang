import { IsEmail, IsString } from 'class-validator';

export class CreateVerificationDto {
  @IsString()
  @IsEmail()
  email!: string;
}
