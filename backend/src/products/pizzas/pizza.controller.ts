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
} from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CardItem } from '../interfaces/card.interface';
import { PizzaService } from './pizza.service';
// import { Auth } from 'src/decorators/auth.decorator';
// import { Auth } from 'src/decorators/auth.decorator';

@Controller('pizzas')
export class PizzaController {
  logger: Logger;
  constructor(private readonly pizzaService: PizzaService) {
    this.logger = new Logger();
  }

  @Get()
  // @Auth('ADMIN')
  getPizzas(): Promise<CardItem[]> {
    return this.pizzaService.getPizzas();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addPizza(@Body() createPizzaDto: CreateCardDto): Promise<CardItem> {
    return this.pizzaService.addPizza(createPizzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CardItem> {
    return this.pizzaService.remove(id);
  }

  @Put(':id')
  updatePizza(
    @Body() updatePizzaDto: UpdateCardDto,
    @Param('id') id: string,
  ): Promise<CardItem> {
    return this.pizzaService.updatePizza(id, updatePizzaDto);
  }
}
