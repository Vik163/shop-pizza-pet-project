import webpack from 'webpack';
import path from 'path';
// декомпозиция конфига --------------
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

// деплой 14_18 7min
function getApiUrl(mode: BuildMode, apiUrl?: string) {
   if (apiUrl) {
      return apiUrl;
   }
   if (mode === 'production') {
      return '/api';
   }

   return 'https://pizzashop163.ru/api';
   // return 'https://127.0.0.1:8000';
}

// env указывается в package.json при запуске скрипта
export default (env: BuildEnv) => {
   // прописываем пути ---------
   const paths: BuildPaths = {
      entry: path.resolve(__dirname, './src/index.tsx'),
      build: path.resolve(__dirname, './build'),
      html: path.resolve(__dirname, './public/index.html'),
      src: path.resolve(__dirname, './src'),
      favicon: path.resolve(__dirname, './public/favicon.png'),
   };

   // логика development или production ----
   const mode = env?.mode || 'development'; // env? 14_11
   const PORT = env?.port || 3000;
   const apiUrl = getApiUrl(mode, env?.apiUrl);

   const isDev = mode === 'development';

   const config: webpack.Configuration = buildWebpackConfig({
      mode,
      paths,
      isDev,
      port: PORT,
      apiUrl,
      // для тестов
      project: 'frontend',
   });

   return config;
};
