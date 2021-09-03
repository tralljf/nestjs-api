export class CreateOrderBookDto {
  sell_rate: number;
  buy_rate: number;
  sell_book: string;
  buy_book: string;
  exchange: string;
  currency: string;
}
