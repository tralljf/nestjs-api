import { Injectable } from '@nestjs/common';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { OrderBookDto } from './dto/order-book.dto';

@Injectable()
export class OrderBookService {
  constructor(private idempService: IdempService) {}

  async getCache(key: string): Promise<OrderBookDto | any> {
    return await (
      await this.idempService.get(key)
    ).bodyRequest;
  }

  async get(coin: string): Promise<OrderBookDto> {
    const orderBookCache = await this.getCache(coin);

    if (orderBookCache) {
      return orderBookCache;
    }
  }
}
