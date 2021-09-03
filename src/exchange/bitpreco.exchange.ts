import { Injectable } from '@nestjs/common';
import { ExchangeBase } from 'src/common/exchanges/exchange.base';

@Injectable()
export class BitPrecoExchange implements ExchangeBase {
  async bind(fn: Function, target) {
    const resp = await fn();
    let satisfied_this_order = 0;
    let total_satisfied = 0;
    let buy_rate = 0;
    let sell_rate = 0;
    let exchange_sell_book = '';
    let exchange_buy_book = '';
    let exchange_top_sell_price = 0;
    let exchange_top_buy_price = 0;

    await resp.forEach((res: any) => {
      exchange_top_sell_price = res.data.asks[0].price;

      for (const asks of res.data.asks) {
        exchange_sell_book += `${asks.amount}:${asks.price};`;
        satisfied_this_order = asks.amount * asks.price;
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          sell_rate = asks.price;
          break;
        }
      }

      satisfied_this_order = 0;
      total_satisfied = 0;
      exchange_top_buy_price = res.data.bids[0].price;
      for (const bids of res.data.bids) {
        exchange_buy_book += `${bids.amount}:${bids.price};`;
        satisfied_this_order = bids.amount * bids.price;
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          buy_rate = bids.price;
          break;
        }
      }
    });

    return {
      exchange: 'Bitpreço',
      final_price: (sell_rate + buy_rate) / 2,
      currency: 'BTC',
      deepth_amount: target,
      sell_price: sell_rate,
      exchange_sell_book: exchange_sell_book,
      exchange_top_sell_price: exchange_top_sell_price,
      buy_price: buy_rate,
      exchange_buy_book: exchange_buy_book,
      exchange_top_buy_price: exchange_top_buy_price,
    };
  }
}
