// src/auth/dto/register.dto.ts

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  sobrenome: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  senha: string;
}
