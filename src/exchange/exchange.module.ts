import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BinanceExchange } from './binance.exchange';
import { BitPrecoExchange } from './bitpreco.exchange';

@Module({
  imports: [HttpModule],
  providers: [BinanceExchange, BitPrecoExchange],
  exports: [BinanceExchange, BitPrecoExchange],
})
export class ExchangeModule {}
