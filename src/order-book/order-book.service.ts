import { IdempData } from 'src/common/idempotency/idemp.cache';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, throwError } from 'rxjs';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { Repository } from 'typeorm';
import { OrderBook } from './order-book.entity';

@Injectable()
export class OrderBookService {
  constructor(
    @InjectRepository(OrderBook)
    private readonly orderBookRepository: Repository<OrderBook>,
    private idempService: IdempService,
  ) {}

  async findLast(): Promise<OrderBook> {
    return this.orderBookRepository.findOne();
  }

  async findCache(key) {
    return await (
      await this.idempService.get(key)
    ).bodyRequest;
  }
}
