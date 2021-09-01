import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    console.info('https://api.bitpreco.com/btc-brl/orderbook');
  }
}
