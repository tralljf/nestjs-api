import { OrderBookService } from './../order-book/order-book.service';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
})
export class TasksModule {}
