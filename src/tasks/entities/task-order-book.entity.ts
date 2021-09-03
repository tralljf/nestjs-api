import { OrderBookBase } from 'src/common/entities/order-book.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'prices' })
export class TaskOrderBook extends OrderBookBase {}
