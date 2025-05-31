import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(415).json({ message: 'Content-type inválido' });
    }
    next();
  }
}
