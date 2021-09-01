import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerHttpHelper } from './logger-http.helper';
import { LoggerAllService } from '../logger-all.service';
import { Request, Response } from 'express';
import { LoggerHttpDto } from './logger-http.dto';

@Injectable()
export class LoggerHttpMiddleware implements NestMiddleware {
  constructor(private logger: LoggerAllService) {}

  use(req: Request, res: Response, next: () => void) {
    try {
      const oldWrite = res.write;
      const oldEnd = res.end;
      const chunks = [];
      let responseBody: string;
      let loggerDto = new LoggerHttpDto();

      loggerDto = LoggerHttpHelper.formatRequest(req, loggerDto);

      res.write = function (chunk) {
        chunks.push(chunk);
        return oldWrite.apply(res, arguments);
      };

      res.end = function (chunk) {
        if (chunk) chunks.push(chunk);

        oldEnd.apply(res, arguments);
        responseBody = Buffer.concat(chunks).toString('utf8');
      };

      res.on('finish', () => {
        loggerDto = LoggerHttpHelper.formatResponse(
          res,
          loggerDto,
          responseBody,
        );

        if (loggerDto.isSuccess) {
          this.logger.log(loggerDto);
        } else {
          //will log error in logger-http-exception.filter.
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  }
}
