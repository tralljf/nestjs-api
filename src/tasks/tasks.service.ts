import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotesService } from 'src/common/http';
import { Repository } from 'typeorm';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import { TaskOrderBook } from './task-order-book.entity';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { IdempData } from 'src/common/idempotency/idemp.cache';
import { BitPrecoExchange } from './../exchange/bitpreco.exchange';
import { url } from 'inspector';
import { BinanceExchange } from 'src/exchange/binance.exchange';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskOrderBook)
    private readonly orderBookRepository: Repository<TaskOrderBook>,
    private readonly quotesService: QuotesService,
    private readonly idempService: IdempService,
    private readonly bitprecoExchange: BitPrecoExchange,
    private readonly binanceExchange: BinanceExchange,
  ) {}

  saveDatabase(createOrderBookDto: CreateOrderBookDto): Promise<TaskOrderBook> {
    const orderBook = new TaskOrderBook();
    orderBook.exchange = createOrderBookDto.exchange;
    orderBook.buy_book = createOrderBookDto.buy_book;
    orderBook.buy_rate = createOrderBookDto.buy_rate;
    orderBook.sell_book = createOrderBookDto.sell_book;
    orderBook.sell_rate = createOrderBookDto.sell_rate;
    orderBook.currency = createOrderBookDto.currency;

    return this.orderBookRepository.save(orderBook);
  }

  saveCache(data, exchange) {
    const idempData = new IdempData();
    idempData.bodyRequest = JSON.stringify(data);

    idempData.bodyResponse = JSON.stringify(data);
    idempData.idempotencyKey = exchange;

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
      buy_rate: res.buy_rate,
      sell_rate: res.sell_rate,
      buy_book: res.buy_book,
      sell_book: res.sell_book,
      exchange: res.exchange,
      currency: res.currency,
    };

    this.saveCache(data, 'exchange');
    this.saveDatabase(data);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async workerBinance() {
    const res = await this.binanceExchange.bind(
      () =>
        this.quotesService.getQuotes(
          'https://api.binance.com/api/v3/depth?symbol=BTCBRL',
        ),
      10000,
    );

    let dataBinance = {
      buy_rate: res.buy_rate,
      sell_rate: res.sell_rate,
      buy_book: res.buy_book,
      sell_book: res.sell_book,
      exchange: res.exchange,
      currency: res.currency,
    };

    this.saveCache(dataBinance, 'exchange');
    this.saveDatabase(dataBinance);
  }
}
