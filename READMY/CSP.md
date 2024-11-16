### CSP

#### [Настройка (CSP) Content Security Policy (Webpack NGINX)](https://www.hectane.com/blog/react-content-security-policy-webpack-node-nginx)

Проверить можно [CSP Evaluator](https://csp-evaluator.withgoogle.com)
[Дерективы CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/base-uri)

```javascript
    // NGINX настройка сервера фронтенда
    server {
        listen       3000 ssl;
        server_name  localhost;

        # location of ssl certificate
        ssl_certificate /usr/local/etc/ca-certificates/cert.pem;

        # location of ssl key
        ssl_certificate_key /usr/local/etc/ca-certificates/key.pem;

        // Объявление переменных настроек
        set $CSP_SCRIPT_SRC "'self' 'nonce-$request_id' 'unsafe-inline' 'strict-dynamic' yastatic.net api-maps.yandex.ru";
        set $CSP_STYLE_SRC "'unsafe-inline' fonts.googleapis.com";
        set $CSP_CONNECT_SRC "'self' autofill.yandex.ru wss://127.0.0.1 api-maps.yandex.ru core-renderer-tiles.maps.yandex.net yandex.ru blob:";
        set $CSP_FONT_SRC  "'self' fonts.gstatic.com";
        set $CSP_IMG_SRC "'self' data: localhost:8000 mc.yandex.ru";
        set $CSP_OBJECT_SRC "'none'"; // определяет разрешённые источники для плагинов, например Java и Flash, элементов <object>, <embed>, или <applet>
        set $CSP_BASE_URI "'none'";
        set $CSP_FRAME_SRC "'self' https://www.google.com https://mc.yandex.ru";
        set $CSP_MANIFEST_SRC "'none'";
        set $CSP_MEDIA_SRC "'self'";
        set $CSP_WORKER_SRC "'self' data:  blob:";
        set $CSP_FRAME_ANCESTORS "'self'";

        location / {
            // установка Content-Security-Policy
            add_header Content-Security-Policy "default-src 'none'; script-src $CSP_SCRIPT_SRC; style-src $CSP_STYLE_SRC; connect-src $CSP_CONNECT_SRC; font-src $CSP_FONT_SRC; img-src $CSP_IMG_SRC; object-src $CSP_OBJECT_SRC; base-uri $CSP_BASE_URI; frame-src $CSP_FRAME_SRC; manifest-src $CSP_MANIFEST_SRC; media-src $CSP_MEDIA_SRC; worker-src $CSP_WORKER_SRC; frame-ancestors $CSP_FRAME_ANCESTORS;";
            sub_filter_once off; // указывает следует ли искать каждую строку для замены один раз (off)
            sub_filter "_NONCE_" $request_id; // задает строку для замены и строку замены (**CSP_NONCE** $request_id). Находит строку **CSP_NONCE** в статике, и заменяет ее на значение переменной $request_id

            root   html;
            index  index.html index.htm;
        }
        location = / {
            root   html;
        }
    }
}
```

#### Дополнение к инфе с сайта - настройка webpack

-  В index.html добавить:

   ```javascript
   <script
      nonce='_NONCE_'
      src='<%= htmlWebpackPlugin.options.apiYaId %>'
   ></script>
   ```

   -  во все теги 'link' и 'script' `nonce="_NONCE_"`

-  Webpack:

   -  Создать плагин `nonceInjector.ts`

      ```javascript
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
                        tag.attributes.nonce = this.NONCE_PLACEHOLDER;
                      });
                      callback(null, compilationHTML);
                    }
                  );
                });
              }
            }
      ```

   -  Импортировать плагин NonceInjector из `nonceInjector.ts` в webpack plugins

      ```javascript
      // последний в массиве
      new NonceInjector("_NONCE_"),
      ```

   -  добавить или изменить на `devtool: "cheap-module-source-map",` (убрал 'eval-cheap-module-source-map' из-за ошибки загрузки кода CSP)
