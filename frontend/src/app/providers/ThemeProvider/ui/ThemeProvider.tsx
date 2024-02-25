import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

// const defaultTheme =
//     (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
   initialTheme?: Theme;
   children: ReactNode; // 11_7 3min
}

// 16_20 2min чтобы при перезагрузке не переключались темы
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

// создаем провайдер
const ThemeProvider = (props: ThemeProviderProps) => {
   const { initialTheme, children } = props;

   // 15_5 20min и 15_6 7min получаем дефолтные настройки
   // 16_22 почему отключили
   // const { theme: defaultTheme } = useJsonSettings();
   const [isThemeInited, setThemeInited] = useState(false);

   // получаем тему из хранилища или light
   const [theme, setTheme] = useState<Theme>(
      // initialTheme || defaultTheme || Theme.LIGHT,
      initialTheme || fallbackTheme || Theme.LIGHT,
   );

   // 15_5 20min получаем дефолтные настройки
   useEffect(() => {
      if (!isThemeInited && initialTheme) {
         // setTheme(defaultTheme);
         setTheme(initialTheme);
         setThemeInited(true);
      }
   }, [initialTheme, isThemeInited]);

   // 16_19
   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
   }, [theme]);

   // используем useMemo, чтобы при рендере не создавать новый а возвращать старый объект
   // если из массива зависимостей ничего не изменилось
   const defaultProps = useMemo(
      () => ({
         theme,
         setTheme,
      }),
      [theme],
   );

   return (
      <ThemeContext.Provider value={defaultProps}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;
