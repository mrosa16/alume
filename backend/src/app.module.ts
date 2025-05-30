import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { SimulationsModule } from './simulation/simulations.module';

@Module({
  imports: [PrismaModule, AuthModule, StudentsModule, SimulationsModule],
})
export class AppModule {}
