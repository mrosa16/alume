export interface Simulation {
  id: string;
  valor_total: number;
  quantidade_parcelas: number;
  juros_ao_mes: number;
  valor_parcela_mensal: number;
  data_criacao: string;
}

export interface TableProps {
  limit?: number;
}
