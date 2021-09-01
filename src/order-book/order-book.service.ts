import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import { OrderBook } from './order-book.entity';

@Injectable()
export class OrderBookService {
  constructor(
    @InjectRepository(OrderBook)
    private readonly orderBookRepository: Repository<OrderBook>,
  ) {}

  create(createOrderBookDto: CreateOrderBookDto): Promise<OrderBook> {
    const orderBook = new OrderBook();
    orderBook.exchange = createOrderBookDto.exchange;
    orderBook.buy_book = createOrderBookDto.buy_book;
    orderBook.buy_rate = createOrderBookDto.buy_rate;
    orderBook.sell_book = createOrderBookDto.sell_book;
    orderBook.sell_rate = createOrderBookDto.sell_rate;

    return this.orderBookRepository.save(orderBook);
  }

  async findLast(): Promise<OrderBook> {
    return this.orderBookRepository.findOne();
  }
}
