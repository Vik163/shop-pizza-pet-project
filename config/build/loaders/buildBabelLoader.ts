import { type BuildOptions } from "../types/config";

// 11_10 миграция на babel-loader
interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/, // меняем расширения
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true, //  13_17 3min улучшаем сборку
        presets: ["@babel/preset-env"],
        plugins: [
          [
            "@babel/plugin-transform-typescript", // 11_10 4min
            {
              isTsx,
            },
          ],
          "@babel/plugin-transform-runtime",
          isDev && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
      },
    },
  };
}
