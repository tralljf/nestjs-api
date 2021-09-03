export class CreateOrderBookDto {
  exchange: string;
  final_price: number;
  currency: string;
  deepth_amount: number;
  sell_price: number;
  exchange_sell_book: string;
  exchange_top_sell_price: number;
  buy_price: number;
  exchange_buy_book: string;
  exchange_top_buy_price: number;
}
