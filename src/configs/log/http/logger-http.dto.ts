import { LoggerBase, SourceType } from '../logger-base.dto';

export class LoggerHttpDto extends LoggerBase {
  constructor() {
    super();

    this.sourceType = SourceType.HTTP;
  }

  clientName: string;
  requestHost: string;
  requestMethod: string;
  requestPath: string;
  requestBody: string;
  responseBody: string;
  statusCode: number;
  context: string;
}
