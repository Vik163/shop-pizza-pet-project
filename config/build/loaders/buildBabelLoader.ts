import { type BuildOptions } from "../types/config";

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/, // меняем расширения
    exclude: /node_modules/,
    use: {
      loader: "babel-loader", // преобразует в обычный код JavaScript, поддерживаемый старыми браузерами
      options: {
        cacheDirectory: true, //  увеличивает скорость
        presets: ["@babel/preset-env"], // для компиляции кода в синтаксисе ES5, который понимают браузеры
        plugins: [
          [
            "@babel/plugin-transform-typescript", // плагин, который позволяет анализировать и преобразовывать код TypeScript в JavaScript
            {
              isTsx,
            },
          ],
          "@babel/plugin-transform-runtime", // смотрит код на наличие ES6 фич и если они есть, трансформирует код так, чтобы эти фичи брались не из глобального скоупа, а импортировались из babel-runtime
          isDev && require.resolve("react-refresh/babel"), // нужен для включения функции «Fast Refresh» (быстрой перезагрузки) для компонентов React (при перезагрузке страницы состояния компонентов остаются неизменными)
        ].filter(Boolean),
      },
    },
  };
}
