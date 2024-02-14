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
      publicPath: "/", // 7_2 9мин - путь для :id
    },
    plugins: buildPlugins(options),
    module: {
      // Обрабатывает файлы все файлы кроме js
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options), // Чтобы не указывать расширение при импорте
    // Не срабатывают при production
    // devtool: isDev ? 'eval-cheap-module-source-map' : undefined, // позволяет видеть кде в коде произошла ошибка
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    // externals: {
    //   vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // },
  };
}
