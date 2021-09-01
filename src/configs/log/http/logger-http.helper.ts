import { Request, Response } from 'express';
import { LoggerHttpDto } from './logger-http.dto';

export class LoggerHttpHelper {
  public static formatRequest(
    req: Request,
    loggerDto: LoggerHttpDto,
  ): LoggerHttpDto {
    if (req) {
      loggerDto.requestBody = JSON.stringify(req.body);
      loggerDto.requestMethod = req.method;
      loggerDto.ip = req.ip;
      loggerDto.requestPath = req.path;
      loggerDto.requestHost = req.hostname;
      loggerDto.title = `HTTP ${loggerDto.requestMethod} To ${loggerDto.requestPath}`;

      return loggerDto;
    }
  }

  public static formatResponse(
    res: Response,
    loggerDto: LoggerHttpDto,
    responseBody: string,
  ): LoggerHttpDto {
    if (res) {
      loggerDto.statusCode = res.statusCode;
      loggerDto.isSuccess = res.statusCode >= 200 && res.statusCode < 300;
      loggerDto.responseBody = JSON.stringify(responseBody);
      return loggerDto;
    }
  }
}
