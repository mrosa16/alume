import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nome!: string;

  @IsNotEmpty()
  sobrenome!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  senha!: string;
}
