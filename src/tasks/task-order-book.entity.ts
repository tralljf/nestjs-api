import { OrderBookBase } from 'src/common/entities/order-book.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'order_book' })
export class TaskOrderBook extends OrderBookBase {}
