import { Repository } from 'typeorm';
import { Pizzas } from '../entities/pizzas.entity';
import { Snacks } from '../entities/snacks.entity';
import { Sauces } from '../entities/sauces.entity';
import { Combos } from '../entities/combos.entity';
import { Drinks } from '../entities/drinks.entity';

export interface ProductsEntities {
  pizzas: Repository<Pizzas>;
  combos: Repository<Snacks>;
  snacks: Repository<Sauces>;
  sauces: Repository<Combos>;
  drinks: Repository<Drinks>;
}
