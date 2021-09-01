import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerStartup } from './configs/startup/swagger.startup';
import { LoggerAllService } from './configs/log/logger-all.service';
import { AllExceptionFilter } from './configs/log/logger-all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerStartup.init(app);
  loggerStartup(app);
  await app.listen(parseInt(process.env.LISTEN_PORT));
}
bootstrap();

async function loggerStartup(app: INestApplication) {
  const loggerAllService = app.get(LoggerAllService);
  const allExceptionFilter = new AllExceptionFilter(loggerAllService);
  app.useLogger(loggerAllService);
  app.useGlobalFilters(allExceptionFilter);

  process.on('uncaughtException', (err, origin) => {
    loggerAllService.error(err, origin);
    console.log(err);
  });
}
