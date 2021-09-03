import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderBookDto } from '../dto/create-order-book.dto';
import { OrderBookDto } from '../dto/order-book.dto';
import { OrderBook } from '../entities/order-book.entity';

@Injectable()
export class OrderBookRepository {
  constructor(private readonly orderBookRepository: Repository<OrderBook>) {}

  async findOne(): Promise<OrderBookDto> {
    return await this.orderBookRepository.findOne();
  }

  async findToCurrency(coin: string): Promise<OrderBookDto> {
    const price = await this.orderBookRepository.findOne({
      currency: coin,
    });

    if (price) {
      return price;
    }
  }

  async saveDatabase(
    createOrderBookDto: CreateOrderBookDto,
  ): Promise<OrderBookDto> {
    const orderBook = new OrderBookDto();
    orderBook.exchange = createOrderBookDto.exchange;
    orderBook.final_price = createOrderBookDto.final_price;
    orderBook.currency = createOrderBookDto.currency;
    orderBook.deepth_amount = createOrderBookDto.deepth_amount;
    orderBook.sell_price = createOrderBookDto.sell_price;
    orderBook.exchange_sell_book = createOrderBookDto.exchange_sell_book;
    orderBook.exchange_top_sell_price =
      createOrderBookDto.exchange_top_sell_price;
    orderBook.buy_price = createOrderBookDto.buy_price;
    orderBook.exchange_buy_book = createOrderBookDto.exchange_buy_book;
    orderBook.exchange_top_buy_price =
      createOrderBookDto.exchange_top_buy_price;

    return this.orderBookRepository.save(orderBook);
  }
}
