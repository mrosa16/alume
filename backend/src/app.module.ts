import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { SimulationsModule } from './simulation/simulations.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { RateLimitMiddleware } from './common/middlewares/rateLimit.middleware';
import { HeaderValidationMiddleware } from './common/middlewares/headerValidation.middleware';
import { RequestIdMiddleware } from './common/middlewares/requestId.middleware';
import { RequestTimeMiddleware } from './common/middlewares/requestTime.middleware';

@Module({
  imports: [PrismaModule, AuthModule, StudentsModule, SimulationsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, RequestIdMiddleware).forRoutes('*');
    consumer.apply(RequestTimeMiddleware).forRoutes('*');
    consumer
      .apply(RateLimitMiddleware, HeaderValidationMiddleware)
      .forRoutes(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      );
  }
}
