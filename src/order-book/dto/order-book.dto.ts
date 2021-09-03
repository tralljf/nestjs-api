import { ApiProperty } from '@nestjs/swagger';

export class OrderBookDto {
  @ApiProperty()
  currency: string;

  @ApiProperty()
  deepth_amount: number;

  @ApiProperty()
  sell_price: number;

  @ApiProperty()
  exchange_sell_book: string;

  @ApiProperty()
  exchange_top_sell_price: number;

  @ApiProperty()
  buy_price: number;

  @ApiProperty()
  exchange_buy_book: string;

  @ApiProperty()
  exchange_top_buy_price: number;
}
