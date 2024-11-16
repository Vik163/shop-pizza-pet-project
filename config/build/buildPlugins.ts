import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import dotenv from 'dotenv';
import { type BuildOptions } from './types/config';
import { NonceInjector } from './plugins/nonceInjector';



export function buildPlugins({
   paths,
   isDev,
   apiUrl,
   project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
   const isProd = !isDev; // 13_17 улучшаем сборку
   dotenv.config();

   // упрощает создание HTML-файлов для обслуживания ваших пакетов webpack. Это особенно полезно для пакетов webpack, которые содержат хэш в имени файла
   const plugins = [
      new HtmlWebpackPlugin({
         template: paths.html,
         favicon: paths.favicon,
         apiMap: `https://api-maps.yandex.ru/v3/?apikey=${process.env.REACT_APP_YA_MAP_KEY}&lang=ru_RU`,
         apiYaId: "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js",
      }),

      // отображения отчетов о ходе выполнения во время компиляции
      new webpack.ProgressPlugin(),

      // прокидывает глобальные переменные
      new webpack.DefinePlugin({
         'process.env': JSON.stringify(process.env),
         __IS_DEV__: JSON.stringify(isDev),
         __API__: JSON.stringify(apiUrl),
         __PROJECT__: JSON.stringify(project),
      }),

      // кольцевые зависимости 
      new CircularDependencyPlugin({
         exclude: /node_modules/,
         failOnError: true, // при обнаружении выпадает ошибка
      }),

      // миграция на babel-loader
      //  ускоряет проверку типов TypeScript и проверку ESLint, перемещая их в отдельные процессы (обработка типов отдельно)
      new ForkTsCheckerWebpackPlugin({
         typescript: {
            diagnosticOptions: {
               semantic: true,
               syntactic: true,
            },
            mode: 'write-references',
         },
      }),
      new NonceInjector("_NONCE_"),

   ];

   // CI (github actions) запускаются только при dev
   if (isDev) {
      plugins.push(new ReactRefreshWebpackPlugin());
      // В новой версии не нужен HotModuleReplacementPlugin если в devServere стоит hot: true,
      // plugins.push(
      //    new BundleAnalyzerPlugin({
      //       // не открывается постоянно
      //       openAnalyzer: true, // запуск по ссылке в терминале
      //    }),
      // ); // Анализирует размер бандла
   }

   if (isProd) {
      // Этот плагин извлекает CSS из отдельных файлов. Он создаёт файл CSS для каждого JS-файла, содержащего CSS. Он поддерживает загрузку CSS по требованию и SourceMaps
      plugins.push(
         new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
         }),
      );
   }

   return plugins;
}
