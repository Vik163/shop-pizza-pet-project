import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Compilation {
        html: string;
        headTags: HtmlWebpackPlugin.HtmlTagObject[];
        bodyTags: HtmlWebpackPlugin.HtmlTagObject[];
        outputName: string;
        plugin: HtmlWebpackPlugin;
}

export class NonceInjector {
    NONCE_PLACEHOLDER: string;

  constructor(NONCE_PLACEHOLDER: string) {
    this.NONCE_PLACEHOLDER = NONCE_PLACEHOLDER;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply(compiler: { hooks: { thisCompilation: { tap: (arg0: string, arg1: (compilation: any) => void) => void; }; }; }) {
    compiler.hooks.thisCompilation.tap("NonceInjector", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        "NonceInjector",
        (compilationHTML: Compilation, callback) => {
          const { headTags } = compilationHTML;

          headTags.forEach((tag) => {
            console.log('this.NONCE_PLACEHOLDER:', this.NONCE_PLACEHOLDER)
            tag.attributes.nonce = this.NONCE_PLACEHOLDER;
          });
          callback(null, compilationHTML);
        }
      );
    });
  }
}

