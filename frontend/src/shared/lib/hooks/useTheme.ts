import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../const/theme';

interface UseThemeResult {
   toggleTheme: (saveAction?: (theme: Theme) => void) => void; // 15_5 6min
   theme: Theme;
}

// Создаем пользовательский hook
// Получаем из контекста данные, описываем логику
// Возвращаем объект и сохраняем тему в localStorage
export function useTheme(): UseThemeResult {
   const { theme, setTheme } = useContext(ThemeContext);

   const toggleTheme = (saveAction?: (theme: Theme) => void) => {
      let newTheme: Theme;
      switch (theme) {
         case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
         case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
         default:
            newTheme = Theme.LIGHT;
      }
      setTheme?.(newTheme);

      saveAction?.(newTheme); // 15_5 6min
      // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
   };

   return {
      theme: theme || Theme.LIGHT,
      toggleTheme,
   };
}
