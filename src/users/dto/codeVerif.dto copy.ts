import { IsNotEmpty, IsString } from 'class-validator';

export class CodeVerifDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
