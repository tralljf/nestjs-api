import { Injectable } from '@nestjs/common';
import { ExchangeBase } from 'src/common/exchanges/exchange.base';
@Injectable()
export class BinanceExchange extends ExchangeBase {
  async bind(fn: any, target: number) {
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
      exchange_top_sell_price = parseFloat(res.data.asks[0][0]);

      for (const asks of res.data.asks) {
        exchange_sell_book += `${asks[1]}:${asks[0]};`;
        satisfied_this_order = asks[1] * asks[0];
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          sell_rate = parseFloat(asks[0]);
          break;
        }
      }

      satisfied_this_order = 0;
      total_satisfied = 0;
      exchange_top_buy_price = parseFloat(res.data.bids[0][0]);
      for (const bids of res.data.bids) {
        exchange_buy_book += `${bids[1]}:${bids[0]};`;
        satisfied_this_order = bids[1] * bids[0];
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          buy_rate = parseFloat(bids[0]);
          break;
        }
      }
    });

    return {
      exchange: 'Binance',
      final_price: (sell_rate + buy_rate) / 2.0,
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
