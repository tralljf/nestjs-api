import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
