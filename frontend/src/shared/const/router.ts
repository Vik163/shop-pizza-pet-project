export enum AppRoutes {
   PIZZAS = 'pizzas',
   COMBOS = 'combos',
   SAUCES = 'sauces',
   DRINKS = 'drinks',
   SNACKS = 'snacks',
   ACTIONS = 'actions',
   PROFILE = 'profile',
   CONTACTS = 'contacts',
   //    FORBIDDEN = 'forbidden',
   MAIN = 'main',

   //    // last
   NOT_FOUND = 'not_found',
}

export const RoutePath = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.CONTACTS]: '/contacts',
   [AppRoutes.ACTIONS]: '/actions',
   [AppRoutes.COMBOS]: '/combos',
   [AppRoutes.DRINKS]: '/drinks',
   [AppRoutes.PROFILE]: '/profile',
   [AppRoutes.PIZZAS]: '/pizzas',
   [AppRoutes.SAUCES]: '/sauces',
   [AppRoutes.SNACKS]: '/snacks',

   // последний
   [AppRoutes.NOT_FOUND]: '*',
};

// 13_15
export const getRouteMain = () => '/';
export const getRouteContacts = () => '/contacts';
export const getRouteActions = () => '/actions';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteYaLogin = () => '/ya_login';
export const getRoutePizzas = () => '/pizzas';
export const getRouteSauces = () => '/sauces';
export const getRouteSnacks = () => '/snacks';
export const getRouteCombos = () => '/combos';
export const getRouteDrinks = () => '/drinks';
// export const getRouteAdmin = () => '/admin';
// export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';

// 16_21 6min
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
   [getRouteMain()]: AppRoutes.MAIN,
   [getRouteContacts()]: AppRoutes.CONTACTS,
   [getRouteActions()]: AppRoutes.ACTIONS,
   [getRouteProfile(':id')]: AppRoutes.PROFILE,
   [getRoutePizzas()]: AppRoutes.PIZZAS,
   [getRouteSauces()]: AppRoutes.SAUCES,
   [getRouteSnacks()]: AppRoutes.SNACKS,
   [getRouteCombos()]: AppRoutes.COMBOS,
   [getRouteDrinks()]: AppRoutes.DRINKS,
   //    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
   //    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
   [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
