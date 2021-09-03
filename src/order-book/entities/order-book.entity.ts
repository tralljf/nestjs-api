import { OrderBookBase } from 'src/common/entities/order-book.entity';
import { Entity } from 'typeorm';

@Entity()
export class OrderBook extends OrderBookBase {}
