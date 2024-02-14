/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { type Configuration, DefinePlugin, type RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

// 14_7
export default {
   stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

   addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
   ],

   framework: {
      name: '@storybook/react-webpack5',
      options: {},
   },
   docs: {
      autodocs: 'tag',
   },

   webpackFinal: async (config: Configuration) => {
      const paths = {
         build: '',
         html: '',
         entry: '',
         src: path.resolve(__dirname, '../../src'),
      };

      // config! - 5_6 - 25 min
      // !. означает, что не равны undefined
      config.resolve!.modules!.push(paths.src);
      config.resolve!.extensions!.push('.ts', '.tsx');
      config.resolve!.alias = {
         ...config.resolve!.alias,
         '@': paths.src, // 13_1
      };

      config.module!.rules = config.module!.rules!.map(
         // @ts-expect-error разобраться
         (rule: RuleSetRule) => {
            if ((rule.test as string).includes('svg')) {
               return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
         },
      );

      config.module!.rules.push({
         test: /\.svg$/,
         use: ['@svgr/webpack'],
      });
      config.module!.rules.push(buildCssLoader(true));

      config.plugins!.push(
         new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('https://testapi.ru'), // https://testapi.ru 11_7 18min
            __PROJECT__: JSON.stringify('storybook'),
         }),
      );
      return config;
   },
};
