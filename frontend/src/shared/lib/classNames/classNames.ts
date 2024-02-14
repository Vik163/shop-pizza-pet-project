export type Mods = Record<string, boolean | string | undefined>;

export const classNames = (
   cls: string,
   mods: Mods = {},
   additional: Array<string | undefined> = [],
): string => {
   return [
      cls,
      ...additional.filter(Boolean),
      ...Object.entries(mods) // с помощью Object.entries можем получить как ключи, так и значения у объекта
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         .filter(([_, value]) => Boolean(value))
         .map(([className]) => className),
   ].join(' ');
};
