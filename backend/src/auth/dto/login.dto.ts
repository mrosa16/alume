import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email invalido' })
  email!: string;
  @ApiProperty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha!: string;
}
