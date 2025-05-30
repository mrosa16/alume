import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateSimulationsDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Valor total deve ser um número' })
  @Min(1, { message: 'Valor total deve ser maior que zero' })
  valor_total!: number;
  @ApiProperty()
  @IsNumber({}, { message: 'Quantidade de parcelas deve ser um número' })
  @Min(1, { message: 'Deve ter pelo menos uma parcela' })
  quantidade_parcelas!: number;
  @ApiProperty()
  @IsNumber({}, { message: 'Juros ao mês deve ser um número' })
  @Min(0, { message: 'Juros ao mês não pode ser negativo' })
  juros_ao_mes!: number;
}
