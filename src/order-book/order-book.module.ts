import { OrderBookController } from './controllers/order-book.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBookService } from './order-book.service';
import { OrderBook } from './entities/order-book.entity';
import { IdempModule } from 'src/common/idempotency/idemp.module';
import { OrderBookRepository } from './repositories/order-book.respository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBook]), IdempModule],
  providers: [OrderBookService, OrderBookRepository, Repository],
  controllers: [OrderBookController],
})
export class OrderBookModule {}
