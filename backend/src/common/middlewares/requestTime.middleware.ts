import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalEnd = res.end;
    res.end = function (...args: any[]) {
      const duration = Date.now() - start;
      res.setHeader('X-Response-Time', `${duration}ms`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return originalEnd.apply(this, args);
    };
    next();
  }
}
