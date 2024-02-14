import type webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { type BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: [{ // 16_2 2min
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    // Заменяет захардкоженные fill=цвет на fill=currentColor
                    plugins: [ 
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
            }
        }],
    };

    // const babelLoader = buildBabelLoader(options);
    // 11_10 4min
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    // Если не используем тайпскрипт - нужен babel-loader
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    // Можно добавить обработку шрифтов
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // имеет значение место в массиве сначала babelLoader потом typeScriptLoaders
    // ПОРЯДОК ВАЖЕН
    return [
        // babelLoader,
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
    ];
}
