export class IngredientsViewDto {
  readonly caloricValue: number;
  readonly proteins: number;
  readonly fats: number;
  readonly carbohydrates: number;
  readonly weight: number;
  readonly dia?: number;
}

export class IngredientsDto {
  small: IngredientsViewDto;
  average: IngredientsViewDto;
  big: IngredientsViewDto;
}
