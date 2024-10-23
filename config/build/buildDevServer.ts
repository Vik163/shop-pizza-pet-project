import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
   return {
      https: true,
      host: '127.0.0.1', // you can change this ip with your ip
      allowedHosts: ['pizzashop63.online', 'www.pizzashop63.online', 'pizzashop163.ru', 'www.pizzashop163.ru'], // разрешает доступ к devServer
      port: options.port,
      // open: true, // Автоматически открывает в браузере приложение

      // При использовании HTML5 History API страница index.html скорее всего будет отображаться вместо любых 404 ответов
      // Запросы через index page иначе при перезагрузке не на главной странице выпадет ошибка
      historyApiFallback: true,
      // позволяет заменять, добавлять или удалять модули во время работы приложения без полной перезагрузки (сохраняет состояние приложения, обновляет только то, что было изменено, мгновенно обновляет браузер при внесении изменений в CSS/JS)
      hot: true,
      // ошибка и решение port: '0' WebSocketClient.js:13 WebSocket connection to 'wss://127.0.0.1:3000/ws' failed:
      client: {
         webSocketURL: { // Эта опция позволяет указать URL-адрес сервера веб-сокетов (полезно, если вы проксируете сервер разработки и клиентский скрипт не всегда знает, к чему подключаться)
            hostname: undefined,
            pathname: undefined,
            port: process.env.WDS_SOCKET_PORT,
         },
      },
      // Запуск сервера https://webpack.js.org/configuration/dev-server/#devserverhttps
      // server: {
      //    type: 'https',
      //    options: {
      //       ca: '../../mkcertServer/rootCA.pem',
      //       cert: '../../mkcertServer/pizzashop163.ru+4.pem',
      //       key: '../../mkcertServer/pizzashop163.ru+4-key.pem',
      //       requestCert: true,
      //    },
      // },
   };
}
