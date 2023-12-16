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

5. На клиенте создал экземпляр apiPostGuard и интерцептор для установки csrf-токена в headers
6. Токен храниться либо в форме, либо в состоянии (куки и хранилище не использую)
7. При вызове формы на клиенте посылаю запрос на csrf-токен, и после получения, через apiPostGuard, отправляю форму
8. На сервере проверка csrf-токена функцией:

```javascript
validateRequest(req) : булевое значение
```
