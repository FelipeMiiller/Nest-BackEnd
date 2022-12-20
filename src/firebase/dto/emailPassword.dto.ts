import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EmailPassDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
