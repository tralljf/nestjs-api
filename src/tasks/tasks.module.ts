import { BitPrecoExchange } from './../exchange/bitpreco.exchange';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesService } from 'src/common/http';
import { TaskOrderBook } from './entities/task-order-book.entity';
import { TasksService } from './tasks.service';
import { IdempModule } from 'src/common/idempotency/idemp.module';
import { IdempCache } from 'src/common/idempotency/idemp.cache';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { IdempDml } from 'src/common/idempotency/idemp.dml';
import { RedisModule } from 'src/common/redis/redis.module';
import { ExchangeModule } from 'src/exchange/exchange.module';
import { BinanceExchange } from 'src/exchange/binance.exchange';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrderBook]),
    HttpModule,
    IdempModule,
    RedisModule,
    ExchangeModule,
  ],
  providers: [
    TasksService,
    QuotesService,
    IdempCache,
    IdempService,
    IdempDml,
    BinanceExchange,
    BitPrecoExchange,
  ],
})
export class TasksModule {}
