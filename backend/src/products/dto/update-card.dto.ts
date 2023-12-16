import { IngredientsViewDto } from '../ingredients/dto/ingredients-view.dto';

export class UpdateCardDto {
  readonly image: string;
  readonly imageAverage: string;
  readonly imageSmall: string;
  readonly structure: string;
  readonly name: string;
  readonly type: string;
  readonly addInfo: string;
  readonly popular: boolean;
  readonly price: number[];
  readonly discount: number;
  readonly ingredients?:
    | {
        small: IngredientsViewDto;
        average: IngredientsViewDto;
        big: IngredientsViewDto;
      }
    | IngredientsViewDto;
}
