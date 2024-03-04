import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface ThemeProviderProps {
   initialTheme?: Theme;
   children: ReactNode; // 11_7 3min
}

// чтобы при перезагрузке не переключались темы
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

// создаем провайдер
const ThemeProvider = (props: ThemeProviderProps) => {
   const { initialTheme, children } = props;

   // получаем тему из хранилища или light
   const [theme, setTheme] = useState<Theme>(
      fallbackTheme || initialTheme || Theme.LIGHT,
   );

   // Устанавливаем дефолтные настройки
   useEffect(() => {
      if (initialTheme) {
         setTheme(initialTheme);
      }
   }, [initialTheme]);

   // Устанавливаю тему
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
