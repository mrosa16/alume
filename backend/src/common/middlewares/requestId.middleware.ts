import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let requestId: string | undefined;

    const headerId = req.headers['x-request-id'];
    if (Array.isArray(headerId)) {
      requestId = headerId[0];
    } else {
      requestId = headerId;
    }

    if (!requestId) {
      requestId = uuid() ?? '';
    }

    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);

    next();
  }
}
