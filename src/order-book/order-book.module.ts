import { OrderBookController } from './controllers/order-book.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBookService } from './order-book.service';
import { OrderBook } from './entities/order-book.entity';
import { IdempModule } from 'src/common/idempotency/idemp.module';
import { OrderBookRepository } from './repositories/order-book.respository';
import { Repository } from 'typeorm';
import { BinanceExchange } from 'src/exchange/binance.exchange';
import { BitPrecoExchange } from 'src/exchange/bitpreco.exchange';
import { QuotesService } from 'src/common/http';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from 'src/common/redis/redis.module';
import { ExchangeModule } from 'src/exchange/exchange.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderBook]),
    IdempModule,
    HttpModule,
    RedisModule,
    ExchangeModule,
  ],
  providers: [
    OrderBookService,
    OrderBookRepository,
    QuotesService,
    Repository,
    BinanceExchange,
    BitPrecoExchange,
  ],
  controllers: [OrderBookController],
})
export class OrderBookModule {}
