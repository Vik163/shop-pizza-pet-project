export type BuildMode = 'production' | 'development';

export interface BuildPaths {
   entry: string;
   build: string;
   html: string;
   src: string;
}

// export interface BuildOptions {
//    server: {
//       https: boolean;
//       port: number; open:
//       boolean; host: string;
//       allowedHosts: string[];
//    };
//    build: {
//       outDir: string;
//       sourcemap: boolean;
//       minify: string;
//    };
//    esbuild: {
//       supported: { 'top-level-await': boolean; };
//    };
//    resolve: { ...; };
//    plugins: PluginOption[];
//    define: { ...; };
// }
export interface BuildOptions {
   mode: string;
   paths: BuildPaths;
   apiUrl: string;
}
