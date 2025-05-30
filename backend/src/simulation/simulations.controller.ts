import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { SimulationsService } from './simulations.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSimulationsDto } from './dto/create-simulations.dto';

interface AuthRequest extends Request {
  user: {
    userId: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('simulations')
export class SimulationsController {
  constructor(private readonly SimulationsService: SimulationsService) {}

  @Post()
  createSimulation(
    @Request() req: AuthRequest,
    @Body() data: CreateSimulationsDto,
  ) {
    return this.SimulationsService.createSimulation(req.user.userId, data);
  }

  @Get()
  findAllSimulations(@Request() req: AuthRequest) {
    return this.SimulationsService.findAllSimulations(req.user.userId);
  }
}
