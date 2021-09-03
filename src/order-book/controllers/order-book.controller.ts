import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { OrderBookDto } from '../dto/order-book.dto';
import { OrderBookService } from '../order-book.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('crypto-conversion')
@Controller('api/v1/crypto-conversion')
// @UseInterceptors(IdempHttpInterceptor, HttpResponseInterceptor)
export class OrderBookController {
  constructor(private readonly service: OrderBookService) {}

  @Get(':coin')
  @ApiResponse({ status: 200, description: 'success', type: OrderBookDto })
  @ApiResponse({ status: 404, description: 'Not found' })
  async get(@Param('coin') coin: string): Promise<OrderBookDto> {
    const orderBook = this.service.get(coin);

    if (!orderBook) {
      throw new NotFoundException('Order Book not found');
    }

    return orderBook;
  }
}
