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

    await resp.forEach((res: any) => {
      for (const asks of res.data.asks) {
        satisfied_this_order = asks[1] * asks[0];
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          sell_rate = asks[0];
        }
      }

      satisfied_this_order = 0;
      total_satisfied = 0;

      for (const bids of res.data.bids) {
        satisfied_this_order = bids[0] * bids[1];
        total_satisfied = total_satisfied + satisfied_this_order;
        if (total_satisfied >= target) {
          buy_rate = bids[0];
        }
      }
    });

    return {
      buy_rate: buy_rate,
      sell_rate: sell_rate,
      buy_book: '',
      sell_book: '',
      exchange: 'Binance',
    };
  }
}
