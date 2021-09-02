import { OrderBookController } from './controller/order-book.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBookService } from './order-book.service';
import { OrderBook } from './order-book.entity';
import { IdempModule } from 'src/common/idempotency/idemp.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBook]), IdempModule],
  providers: [OrderBookService],
  controllers: [OrderBookController],
})
export class OrderBookModule {}
