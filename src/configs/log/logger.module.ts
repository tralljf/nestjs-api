import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerHttpMiddleware } from './http/logger-http.middleware';
import { LoggerAllService } from './logger-all.service';
import * as winston from 'winston';
import { LoggerElastic } from './elasticsearch/logger.elastic';

const consTrasnport = new winston.transports.Console();

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      transports: [LoggerElastic.GetLogger(), consTrasnport],
    }),
  ],
  providers: [LoggerAllService],
  exports: [LoggerAllService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerHttpMiddleware).forRoutes({
      path: 'api/*',
      method: RequestMethod.ALL,
    });
  }
}
