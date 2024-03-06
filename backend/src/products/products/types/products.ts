import { Model } from 'mongoose';
import { PizzasDocument } from '../schemas/pizzas.schema';
import { CombosDocument } from '../schemas/combos.schema';
import { SnacksDocument } from '../schemas/snacks.schema';
import { SaucesDocument } from '../schemas/sauces.schema';
import { DrinksDocument } from '../schemas/drinks.schema';

export interface ProductsModels {
  pizzas: Model<PizzasDocument>;
  combos: Model<CombosDocument>;
  snacks: Model<SnacksDocument>;
  sauces: Model<SaucesDocument>;
  drinks: Model<DrinksDocument>;
}
