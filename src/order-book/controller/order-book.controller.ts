import { Result } from './../../common/results/result';
import { errorMapped } from './../../common/error-mapped';

import { Controller, Get } from '@nestjs/common';
import { IdempService } from 'src/common/idempotency/idemp.service';
import { OrderBookDto } from '../dto/order-book.dto';
import { OrderBookService } from '../order-book.service';
import { Observable } from 'rxjs';

@Controller('/price')
export class OrderBookController {
  constructor(private readonly orderBookservice: OrderBookService) {}

  @Get()
  async findAll(): Promise<OrderBookDto | any> {
    try {
      return this.orderBookservice
        .findCache('exchange')
        .then()
        .catch(() => this.orderBookservice.findLast());
    } catch (err) {
      Result.fail2(errorMapped.unknown(err));
    }
  }
}
