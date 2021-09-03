import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotesService } from 'src/common/http';
import { IdempData } from 'src/common/idempotency/idemp.cache';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { BitPrecoExchange } from 'src/exchange/bitpreco.exchange';
import { Repository } from 'typeorm';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import { OrderBookDto } from './dto/order-book.dto';
import { OrderBook } from './entities/order-book.entity';

@Injectable()
export class OrderBookService {
  constructor(
    @InjectRepository(OrderBook)
    private readonly orderBookRepository: Repository<OrderBook>,
    private idempService: IdempService,
    private readonly bitprecoExchange: BitPrecoExchange,
    private readonly quotesService: QuotesService,
  ) {}

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

  async saveDatabase(
    createOrderBookDto: CreateOrderBookDto,
  ): Promise<OrderBookDto> {
    return await this.orderBookRepository.save(createOrderBookDto);
  }

  async saveCache(data, key) {
    const idempData = new IdempData();
    idempData.bodyRequest = JSON.stringify(data);

    idempData.bodyResponse = JSON.stringify(data);
    idempData.idempotencyKey = key;

    this.idempService
      .put(idempData)
      .then(() => this.idempService.finish().then());
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async workerBitpreco() {
    const res = await this.bitprecoExchange.bind(
      () =>
        this.quotesService.getQuotes(
          'https://api.bitpreco.com/btc-brl/orderbook',
        ),
      10000,
    );

    let data = {
      exchange: res.exchange,
      final_price: res.final_price,
      currency: res.currency,
      deepth_amount: res.deepth_amount,
      sell_price: res.sell_price,
      exchange_sell_book: res.exchange_sell_book,
      exchange_top_sell_price: res.exchange_top_sell_price,
      buy_price: res.buy_price,
      exchange_buy_book: res.exchange_buy_book,
      exchange_top_buy_price: res.exchange_top_buy_price,
    };

    this.saveCache(data, res.currency);
    this.orderBookRepository.save(data);
  }
}
