import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class LoggerAllService implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: winston.Logger,
  ) {
    logger.on('error', (err) => console.log('\n*** ERROR ***\n', err));
  }

  log(message: any, context?: string) {
    this.do(() => {
      if (this.isNotObject(message)) return;

      message.context = context;
      this.logger.info(message);
    });
  }

  error(message: any, trace?: string, context?: string) {
    this.do(() => {
      if (this.isNotObject(message)) return;

      message.error = trace;
      message.context = context;
      this.logger.error(message);
    });
  }

  warn(message: any, context?: string) {
    this.do(() => {
      if (this.isNotObject(message)) return;

      message.context = context;
      this.logger.warn(message);
    });
  }

  debug?(message: any, context?: string) {
    this.do(() => {
      if (this.isNotObject(message)) return;

      message.context = context;
      this.logger.debug(message);
    });
  }

  verbose?(message: any, context?: string) {
    this.do(() => {
      if (this.isNotObject(message)) return;

      message.context = context;
      this.logger.verbose(message);
    });
  }

  private isObject(message: any): boolean {
    console.log(message);
    return typeof message === 'object';
  }

  private isNotObject = (message: any): boolean => !this.isObject(message);

  private do(func: () => void) {
    try {
      func();
    } catch (err) {
      console.log(err);
    }
  }
}
