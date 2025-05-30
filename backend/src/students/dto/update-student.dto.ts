import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  sobrenome?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;
}
