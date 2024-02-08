### Проверка токенов

- Генерируются в token.servise
- [Использую @nestjs/passport](https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token)
  - Создаю accessToken.strategy.ts and refreshToken.strategy.ts в папке auth/strategies
    - refresh достаю `jwtFromRequest: (req: Request) => req.cookies.refreshToken,`
  - Создаю accessToken.guard.ts and refreshToken.guard.ts в папке src/common/guards
  - Создаю accessToken.decorator.ts and refreshToken.decorator.ts в папке src/common/decorators
