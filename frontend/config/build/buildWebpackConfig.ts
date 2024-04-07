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
    // Яндекс карты =============================
    externalsType: 'script',
    externals: {
        // Вместо YOUR_API_KEY подставить значение настоящего ключа
        ymaps3: [
          `promise new Promise((resolve) => {
              if (typeof ymaps3 !== 'undefined') {
                return ymaps3.ready.then(() => resolve(ymaps3));
              }
              const script = document.createElement('script');
              script.src = "https://api-maps.yandex.ru/v3/?apikey=${process.env.REACT_APP_YA_MAP_KEY}&lang=ru_RU";
              script.onload = () => {
                ymaps3.ready.then(() => resolve(ymaps3));
              };
              document.head.appendChild(script);
            })`
        ]
    },
    // externals: {
    //   vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // },
  };
}
