import { ApiProperty } from '@nestjs/swagger';

export class OrderBookDto {
  @ApiProperty()
  sell_rate: number;

  @ApiProperty()
  buy_rate: number;

  @ApiProperty()
  sell_book: string;

  @ApiProperty()
  buy_book: string;

  @ApiProperty()
  exchange: string;
}
