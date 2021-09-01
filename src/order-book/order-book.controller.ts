import { Controller, Get } from '@nestjs/common';
import { OrderBookService } from './order-book.service';
import { OrderBook } from './order-book.entity';

@Controller()
export class OrderBookController {
  constructor(private readonly orderBookservice: OrderBookService) {}

  @Get()
  findAll(): Promise<OrderBook> {
    return this.orderBookservice.findLast();
  }
}
