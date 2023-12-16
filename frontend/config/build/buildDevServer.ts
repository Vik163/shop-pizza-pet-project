import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
   return {
      https: true,
      // host: '0.0.0.0', // you can change this ip with your ip
      port: options.port,
      open: true, // Автоматически открывает в браузере приложение
      // Запросы через index page иначе при перезагрузке не на главной странице ошибка
      historyApiFallback: true,
      // для плагина HotModuleReplacementPlugin видео 2_6
      hot: true,
   };
}
