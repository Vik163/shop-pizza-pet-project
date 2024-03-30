import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
   return {
      https: true,
      host: '127.0.0.1', // you can change this ip with your ip
      allowedHosts: ['pizzashop163.ru', 'www.pizzashop163.ru'], // nginx
      port: options.port,
      // open: true, // Автоматически открывает в браузере приложение
      // Запросы через index page иначе при перезагрузке не на главной странице ошибка
      historyApiFallback: true,
      // для плагина HotModuleReplacementPlugin видео 2_6
      hot: true,
      // ошибка и решение port: '0' WebSocketClient.js:13 WebSocket connection to 'wss://127.0.0.1:3000/ws' failed:
      client: {
         webSocketURL: {
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
