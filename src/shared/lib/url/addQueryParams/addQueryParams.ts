/* eslint-disable no-undef */
// 9_3 34min

export function getQueryParams(
   params: OptionalRecord<string, string | number>,
) {
   const searchParams = new URLSearchParams(window.location.search);
   Object.entries(params).forEach(([name, value]) => {
      if (value !== undefined) {
         searchParams.set(name, String(value));
      }
   });
   return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */
export function addQueryParams(
   params: OptionalRecord<string, string | number>,
) {
   window.history.pushState(null, '', getQueryParams(params));
}
