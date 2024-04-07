### Yandex Map

1. Использую [Яндекс карты](https://yandex.ru/dev/jsapi30/doc/ru/quickstart)
2. Подключение

   -  Загрузка через webpack (добавляю код в buildWebpackConfig)

      ```javascript
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
      ```

   -  Устанавливаю `npm i --save-dev @yandex/ymaps3-types@latest` (typescript) и добавлюя в tsconfig

   ```javascript
    "typeRoots": [
        "./types",
        "./node_modules/@types",
        "./node_modules/@yandex/ymaps3-types"
     ],
     "paths": {
        "ymaps3": ["./node_modules/@yandex/ymaps3-types"]
     },
   ```

   -  создаю hook useLoadMaps, который асинхронно подгружает карты и возвращает результат загрузки (объект с компонентами)

   ```javascript
   export const useLoadMaps = () => {
   const [isReactify, setIsReactify] = useState<Reactify>();
    // из асинхронной функции получаю reactify
   const getReactify = async () => {
     const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
     const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
     setIsReactify(reactify);
   };

   useEffect(() => {
     getReactify();
   }, []);

    // Используя reactify загружаю компоненты
   const getMaps = useMemo(() => {
     if (isReactify) {
        return isReactify.module(ymaps3);
     }
   }, [isReactify]);

   if (!getMaps) return;
    // возвращаю ненапрямую компоненты, так как загрузка асинхронная и в компонентах требуется проверка
   return getMaps;
   ```

   -  получение в компоненте

   ```javascript
   const mapsElements = useLoadMaps();
   if (!mapsElements) return;

   const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
   } = mapsElements;
   ```
