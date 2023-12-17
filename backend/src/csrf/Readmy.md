### Защита CSRF

1. Защиту реализую только на формы POST- запросов
2. Использовал _Double CSRF_ :

---

npm install cookie-parser csrf-csrf

---

3. Создал файл `csrf.config.ts` и вернул: `validateRequest` - проверка csrf, `doubleCsrfProtection`
4. В `main.ts` последней мидлварой

```javascript
app.use(doubleCsrfProtection);
```

- На клиенте:

  - токен храниться либо в форме, либо в состоянии React или Redux (куки и хранилище не использую)
  - при вызове формы на клиенте посылаю запрос на csrf-токен
  - после получения csrf-токена: установка csrf-токена в headers, отправляю форму

- На сервере проверка csrf-токена (в защитнике CsrfGuard c декоратором @Csrf) функцией:

```javascript
validateRequest(req); // булевое значение
```
