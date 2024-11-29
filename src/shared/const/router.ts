export enum AppRoutes {
   PIZZAS = 'pizzas',
   COMBOS = 'combos',
   SAUCES = 'sauces',
   DRINKS = 'drinks',
   SNACKS = 'snacks',
   ACTIONS = 'actions',
   ABOUT = 'about',
   PROFILE = 'profile',
   CONTACTS = 'contacts',
   BASKET = 'basket',
   ORDER = 'order',
   //    FORBIDDEN = 'forbidden',
   MAIN = 'main',

   ERROR = 'error',
}

export const RoutePath = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.CONTACTS]: '/contacts',
   [AppRoutes.ACTIONS]: '/actions',
   [AppRoutes.ABOUT]: '/about',
   [AppRoutes.COMBOS]: '/combos',
   [AppRoutes.DRINKS]: '/drinks',
   [AppRoutes.PROFILE]: '/profile',
   [AppRoutes.PIZZAS]: '/pizzas',
   [AppRoutes.SAUCES]: '/sauces',
   [AppRoutes.SNACKS]: '/snacks',
   [AppRoutes.BASKET]: '/basket',
   [AppRoutes.ORDER]: '/order',

   // последний
   [AppRoutes.ERROR]: '*',
};

// 13_15
export const getRouteMain = () => '/';
export const getRouteContacts = () => '/contacts';
export const getRouteActions = () => '/actions';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteYaLogin = () => '/ya_login';
export const getRoutePizzas = () => '/pizzas';
export const getRouteSauces = () => '/sauces';
export const getRouteSnacks = () => '/snacks';
export const getRouteCombos = () => '/combos';
export const getRouteDrinks = () => '/drinks';
export const getRouteBasket = () => '/basket';
export const getRouteOrder = () => '/order';

export const getRouteError = () => '*';

// 16_21 6min
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
   [getRouteMain()]: AppRoutes.MAIN,
   [getRouteContacts()]: AppRoutes.CONTACTS,
   [getRouteActions()]: AppRoutes.ACTIONS,
   [getRouteAbout()]: AppRoutes.ABOUT,
   [getRouteProfile(':id')]: AppRoutes.PROFILE,
   [getRoutePizzas()]: AppRoutes.PIZZAS,
   [getRouteSauces()]: AppRoutes.SAUCES,
   [getRouteSnacks()]: AppRoutes.SNACKS,
   [getRouteCombos()]: AppRoutes.COMBOS,
   [getRouteDrinks()]: AppRoutes.DRINKS,
   [getRouteBasket()]: AppRoutes.BASKET,
   [getRouteOrder()]: AppRoutes.ORDER,

   [getRouteError()]: AppRoutes.ERROR,
};
