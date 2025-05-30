import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  nome!: string;
  @ApiProperty()
  @IsNotEmpty()
  sobrenome!: string;
  @ApiProperty()
  @IsEmail()
  email!: string;
  @ApiProperty()
  @IsNotEmpty()
  senha!: string;
}
