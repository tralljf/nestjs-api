import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.eventy';

export abstract class OrderBookBase extends BaseEntity {
  @Column()
  sell_rate: number;

  @Column()
  buy_rate: number;

  @Column()
  sell_book: string;

  @Column()
  buy_book: string;

  @Column()
  exchange: string;
}
