import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { BasketDto } from './dto/basket.dto';

@Controller('order')
export class OrderController {
  constructor(readonly orderService: OrderService) {}

  @Post('basket')
  async addBasket(@Body() body: BasketDto) {
    return await this.orderService.addBasket(body);
  }

  @Get('basket')
  async getBasket() {
    return this.orderService.getBasket();
  }

  @Put('basket/:id')
  async decreaseBasket(@Param('id') id: string) {
    return this.orderService.decreaseBasket(id);
  }

  @Delete('basket/:id')
  async deleteBasket(@Param('id') id: string) {
    return this.orderService.deleteBasket(id);
  }
}
