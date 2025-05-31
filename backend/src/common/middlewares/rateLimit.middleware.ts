import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const requests = new Map<string, number>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    console.log(`Request from ${ip} at ${new Date(now).toISOString()}`);

    if (!requests.has(ip)) {
      requests.set(ip, now);
      return next();
    }

    const lastRequest = requests.get(ip) || 0;
    if (now - lastRequest < 3000) {
      console.log(`Blocked request from ${ip}`);

      return res.status(429).json({ message: 'Muitas requisições feitas' });
    }

    requests.set(ip, now);
    next();
  }
}
