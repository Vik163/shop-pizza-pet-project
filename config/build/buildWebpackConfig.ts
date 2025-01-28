import type webpack from "webpack";
import { type BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    // target: 'webworker', // vscode extensions run in webworker context for
    // VS Code web 📖 -> https://webpack.js.org/configuration/target/#target
    mode,
    entry: paths.entry, // точка входа
    output: {
      // точка выхода
      filename: "[name].[contenthash].js", // Создает файлы main с хешем
      path: paths.build,
      clean: true, // Очищает папку build
      publicPath: "/", // путь для :id
    },
    plugins: buildPlugins(options),
    module: {
      // Обрабатывает файлы все файлы кроме js
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options), // Чтобы не указывать расширение при импорте
    // Не срабатывают при production
    // devtool: isDev ? 'eval-cheap-module-source-map' : undefined, // позволяет видеть где в коде произошла ошибка
    devtool: isDev ? "cheap-module-source-map" : false, // убрал eval из-за ошибки загрузки кода CSP
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
