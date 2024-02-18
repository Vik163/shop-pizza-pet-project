export enum AppRoutes {
   // PIZZA = 'pizza',
   // PASTA = 'pasta',
   // SOUPS = 'soups',
   // SALADS = 'salads',
   // DRINKS = 'drinks',
   // DESSERTS = 'desserts',
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
   // [AppRoutes.DESSERTS]: '/desserts',
   // [AppRoutes.DRINKS]: '/drinks',
   [AppRoutes.PROFILE]: '/profile',
   // [AppRoutes.PIZZA]: '/pizza',
   // [AppRoutes.SALADS]: '/salads',

   // последний
   [AppRoutes.NOT_FOUND]: '*',
};

// 13_15
export const getRouteMain = () => '/';
export const getRouteContacts = () => '/contacts';
export const getRouteActions = () => '/actions';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteYaLogin = () => '/ya_login';
// export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
// export const getRouteArticleCreate = () => '/articles/new';
// export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
// export const getRouteAdmin = () => '/admin';
// export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';

// 16_21 6min
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
   [getRouteMain()]: AppRoutes.MAIN,
   [getRouteContacts()]: AppRoutes.CONTACTS,
   [getRouteActions()]: AppRoutes.ACTIONS,
   [getRouteProfile(':id')]: AppRoutes.PROFILE,
   //    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
   //    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
   //    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
   //    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
   //    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
   [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
