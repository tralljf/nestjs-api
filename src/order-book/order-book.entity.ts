import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderBook {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @Column({ type: 'timestamp' }) // Recommended
  created_at: Date;
}
