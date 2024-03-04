### Theme

-  использую [контекст](https://ru.legacy.reactjs.org/docs/context.html) для хранения темы shared/lib/context
-  переменая с темами в shared/const
-  создаю компонент ThemeProvider, установлениe темы при загрузке из стейта, localStorage и хардкода
-  создаю хук useTheme, который меняет темы в контексте и дополнительно добавляю коллбек `saveAction?.(newTheme)`, с помощью которого можно можно сохранять значения в любом месте

```javascript
// toggleTheme из хука useTheme
const onToggleTheme = () => {
   toggleTheme((newTheme) => {
      dispatch(
         saveUserSettings({
            ...userSettings,
            theme: newTheme,
         }),
      );
   });
};

// saveAction
(newTheme) => {
   dispatch(
      saveUserSettings({
         ...userSettings,
         theme: newTheme,
      }),
   );
};
```

-  создаю хок withThme (`withTheme(App)` - принимет App.ts и возвращает измененный компонент), который отвечает за то, чтобы получить дефолтную тему пользователя и прокинуть ее в ThemeProvider (очищаю ThemeProvider убираю из него `const { theme: defaultTheme } = useSelector(getUserSettings)`)
