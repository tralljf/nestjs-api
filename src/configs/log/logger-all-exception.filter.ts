import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerHttpDto } from './http/logger-http.dto';
import { LoggerHttpHelper } from './http/logger-http.helper';
import { LoggerAllService } from './logger-all.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerAllService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let loggerDto = new LoggerHttpDto();
    loggerDto = LoggerHttpHelper.formatRequest(request, loggerDto);
    loggerDto = LoggerHttpHelper.formatResponse(
      response,
      loggerDto,
      JSON.stringify(exception),
    );

    const isWarn = statusCode >= 400 && statusCode < 500;
    const isError = statusCode >= 500;

    this.logger.error(loggerDto);
    if (isError) {
      this.logger.error(loggerDto);
    } else if (isWarn) {
      this.logger.warn(loggerDto);
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      exception: exception,
    });
  }
}
