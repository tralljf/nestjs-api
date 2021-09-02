export interface ExchangeBaseData {
  buy_rate: number;
  sell_rate: number;
  buy_book: string;
  sell_book: string;
  exchange: string;
}

export abstract class ExchangeBase {
  abstract bind(fn: any, target: number): any;
}
