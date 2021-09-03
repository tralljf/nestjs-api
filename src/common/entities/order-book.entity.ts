import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.eventy';

export abstract class OrderBookBase extends BaseEntity {
  @Column()
  exchange: string;

  @Column()
  final_price: number;

  @Column()
  currency: string;

  @Column()
  deepth_amount: number;

  @Column()
  sell_price: number;

  @Column()
  exchange_sell_book: string;

  @Column()
  exchange_top_sell_price: number;

  @Column()
  buy_price: number;

  @Column()
  exchange_buy_book: string;

  @Column()
  exchange_top_buy_price: number;
}
