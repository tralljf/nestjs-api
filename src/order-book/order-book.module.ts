import { OrderBook } from './order-book.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBookService } from './order-book.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBook])],
  providers: [OrderBookService],
  controllers: [],
})
export class OrderBookModule {}
