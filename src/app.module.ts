import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './configs/environment';
import { HealthController } from './configs/health/health.controller';
import { LoggerModule } from './configs/log/logger.module';
import { OrderBookModule } from './order-book/order-book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: environment.fileName(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'crypto',
      autoLoadEntities: true,
      // entities: ['src/**/*.entity.ts'],
      // migrations: ['src/migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    ScheduleModule.forRoot(),
    TerminusModule,
    LoggerModule,
    OrderBookModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
