import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Body,
  Post,
  HttpCode,
  Delete,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CardItem } from '../interfaces/card.interface';
import { ProductsService } from './products.service';
import { Request } from 'express';
// import { Auth } from 'src/decorators/auth.decorator';
// import { Auth } from 'src/decorators/auth.decorator';

@Controller('products')
export class ProductsController {
  logger: Logger;
  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger();
  }

  @Get()
  // @Auth('ADMIN')
  getPpoducts(@Req() req: Request): Promise<CardItem[]> {
    return this.productsService.getProducts(req);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // addPizza(@Body() createPizzaDto: CreateCardDto): Promise<CardItem> {
  //   return this.productsService.addPizza(createPizzaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<CardItem> {
  //   return this.productsService.remove(id);
  // }

  // @Put(':id')
  // updatePizza(
  //   @Body() updatePizzaDto: UpdateCardDto,
  //   @Param('id') id: string,
  // ): Promise<CardItem> {
  //   return this.productsService.updatePizza(id, updatePizzaDto);
  // }
}
