import { IsString } from 'class-validator';

export class CheckDuplicatedEmail {
  @IsString()
  email!: string;
}
