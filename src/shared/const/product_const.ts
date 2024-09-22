export const nameViewProducts = {
   pizzas: 'Пиццы',
   combos: 'Комбо',
   drinks: 'Напитки',
   sauces: 'Соусы',
   snacks: 'Закуски',
};

export const pathProducts = Object.keys(nameViewProducts).map((i) => `/${i}`);

export enum ProductSortField {
   VIEWS = 'views',
   TITLE = 'title',
   CREATED = 'createdAt',
}

export enum SizePizza {
   BIG = 'большая',
   AVERAGE = 'средняя',
   SMALL = 'маленькая',
}

export enum ViewDough {
   THIN = 'тонкое',
   TRADITIONAL = 'традиционное',
}
