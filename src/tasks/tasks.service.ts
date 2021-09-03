import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotesService } from 'src/common/http';
import { Repository } from 'typeorm';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import { TaskOrderBook } from './entities/task-order-book.entity';
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

  saveCache(data, key) {
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
    this.saveDatabase(data);
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async workerBinance() {
  //   const res = await this.binanceExchange.bind(
  //     () =>
  //       this.quotesService.getQuotes(
  //         'https://api.binance.com/api/v3/depth?symbol=BTCBRL',
  //       ),
  //     10000,
  //   );

  //   let data = {
  //     exchange: res.exchange,
  //     final_price: res.final_price,
  //     currency: res.currency,
  //     deepth_amount: res.deepth_amount,
  //     sell_price: res.sell_price,
  //     exchange_sell_book: res.exchange_sell_book,
  //     exchange_top_sell_price: res.exchange_top_sell_price,
  //     buy_price: res.buy_price,
  //     exchange_buy_book: res.exchange_buy_book,
  //     exchange_top_buy_price: res.exchange_top_buy_price,
  //   };

  //   this.saveCache(data, res.currency);
  //   this.saveDatabase(data);
  // }
}
