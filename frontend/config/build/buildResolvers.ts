import { type ResolveOptions } from 'webpack';
import { type BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true, // абсолютные пути в приоритете
        // указываем пути src, node_modules
        modules: [options.paths.src, 'node_modules'],
        // указываем главный файл
        mainFiles: ['index'],
        // если оставляем пустой объект, не надо указвать @
        alias: {
            '@': options.paths.src, // 12_5 2min
        },
    };
}
