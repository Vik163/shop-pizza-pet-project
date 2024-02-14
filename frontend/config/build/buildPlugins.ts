import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import dotenv from 'dotenv';
import { type BuildOptions } from './types/config';

export function buildPlugins({
   paths,
   isDev,
   apiUrl,
   project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
   const isProd = !isDev; // 13_17 улучшаем сборку
   dotenv.config();

   const plugins = [
      new HtmlWebpackPlugin({
         template: paths.html,
         favicon: paths.favicon,
      }),
      new webpack.ProgressPlugin(),
      // прокидывает глобальные переменные
      new webpack.DefinePlugin({
         'process.env': JSON.stringify(process.env),
         __IS_DEV__: JSON.stringify(isDev),
         __API__: JSON.stringify(apiUrl),
         __PROJECT__: JSON.stringify(project),
      }),
      // кольцевые зависимости 11_9
      new CircularDependencyPlugin({
         exclude: /node_modules/,
         failOnError: true, // при обнаружении выпадает ошибка
      }),
      // миграция на babel-loader 11_10 8min обработка типов отдельно при загрузке
      new ForkTsCheckerWebpackPlugin({
         typescript: {
            diagnosticOptions: {
               semantic: true,
               syntactic: true,
            },
            mode: 'write-references',
         },
      }),
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
      // 13_17 улучшаем сборку
      plugins.push(
         new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
         }),
      );
   }

   return plugins;
}
