import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSimulationsDto } from './dto/create-simulations.dto';

@Injectable()
export class SimulationsService {
  constructor(private prisma: PrismaService) {}

  async createSimulation(userId: string, data: CreateSimulationsDto) {
    const { valor_total, quantidade_parcelas, juros_ao_mes } = data;
    const i = juros_ao_mes / 100;
    const n = quantidade_parcelas;
    const PV = valor_total;

    const PMT = PV * (i / (1 - Math.pow(1 + i, -n)));
    return await this.prisma.simulation.create({
      data: {
        valor_total,
        quantidade_parcelas,
        juros_ao_mes,
        valor_parcela_mensal: Number(PMT.toFixed(2)),
        student: { connect: { id: userId } },
      },
    });
  }

  async findAllSimulations(userId: string) {
    return await this.prisma.simulation.findMany({
      where: { studentId: userId },
      orderBy: { data_criacao: 'desc' },
    });
  }
}
