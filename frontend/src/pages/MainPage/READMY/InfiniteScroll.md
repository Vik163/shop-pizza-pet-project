### Обработка скролла

#### Бесконечный скролл

1. Вешаем ref на нужную страницу, где необходим скролл или используем окно браузера

   ```javascript
    // ставится если необходим свой скролл в нужной странице
    // hasScroll - флаг указывает есть скролл на странице или нет
    ref={hasScroll ? pageWithScrollRef : null}
   ```

   ```javascript
   // hook useInfiniteScroll настройки observer
   // wrapperElement - ref нужной страницы
   const options = {
      // По умолчанию используется окно просмотра браузера, если не указано или если значение null.
      root: pageWithScrollRef?.current || null,
      rootMargin: '0px',
      threshold: 1.0,
   };
   ```

2. Создаем пустой div, вешаем на него scrollTriggerRef и размещаем под страницей с бесконечным скроллом (за ним следит [observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API))
   Если своего скролла на нужной страницы нет, то div ставим куда надо и передаем пропсом

3. Создаем hook useInfiniteScroll, он пропсом получает рефы и коллбек, который вызывается при появлении scrollTriggerRef

```javascript
// 8.5
interface UseInfiniteScrollProps {
    callback?: () => void;
    scrollTriggerRef: MutableRefObject<HTMLDivElement> | undefined;
    pageWithScrollRef?: MutableRefObject<HTMLDivElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
   const { callback, scrollTriggerRef, pageWithScrollRef } = props;

   // [entry] - извлеченный единственный элемент массива (может быть несколько)
    // let callback = (entries, observer) => {
    // entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};

   useEffect(() => {
      if (scrollTriggerRef && callback) {
         let observer: IntersectionObserver | null = null;
         const wrapperElement = pageWithScrollRef?.current || null;
         const triggerElement = scrollTriggerRef.current;

         const options = {
            // По умолчанию используется окно просмотра браузера, если не указано или если значение null.
            root: wrapperElement || null,
            rootMargin: '0px',
            threshold: 1.0,
         };

         observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
               callback();
            }
         }, options);

         observer.observe(triggerElement);

         return () => {
            if (observer && triggerElement) observer?.unobserve(triggerElement);
         };
      }
   }, [callback, scrollTriggerRef, pageWithScrollRef]);
};
```

4. При вызове коллбека отправляется запрос на подгрузку данных, увеличивая страницу

5. Вызов функции в дочернем компоненте. прокидывается с помощью реактовского хука [useImperativeHandle](https://reactdev.ru/reference/react/useImperativeHandle/#parameters)

   -  в компоненте &lt;Page /> onScrollEnd передаётся пропсом в useInfiniteScroll, как callback
   -  в компоненте &lt;MainPage /> создается childRef, который вешается на дочерний

   ```javascript
   export const MainPage = memo(() => {
      const childRef = useRef<RefType>(null);

      return (
         <Page
            onScrollEnd={() => {
               childRef.current?.onLoadNextPart();
            }}
         >
            <MainPageProductsMemo ref={childRef} />
         </Page>
      );
   ```

   -  в компоненте &lt;MainPageProductsMemo /> через forwardRef передается аргументом ref и в useImperativeHandle вызывается нужная функция
   -  добавляем мемоизацию

   ```javascript
    export interface RefType {
        onLoadNextPart: () => void;
    }

    const MainPageProducts = forwardRef(
    (props: MainPageProductsProps, ref: Ref<RefType>) => {

    .. .. .. ..
    // ---
    const onLoadNextPart = () => {
    if (hasMoreProducts)
        dispatch(
           fetchViewProducts({
              page: page + 1,
           }),
        );
      };

      useImperativeHandle(ref, () => ({
         onLoadNextPart,
      }));


    export const MainPageProductsMemo = memo(MainPageProducts);
   ```
