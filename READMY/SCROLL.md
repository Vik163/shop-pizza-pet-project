### Scroll

#### [Возврат скролла](https://dev.to/jesusramirezs/scroll-restoration-react-router-and-my-custom-solution-for-react-studyboard-14bg)

-  Использую пакет [React Visibility Sensor](https://www.npmjs.com/package/react-visibility-sensor)

   -  им оборачивается елемент, при появлении которого срабатывает слушатель `onChange={visibilityChange(card._id, card.type)}`

   ```javascript
   <VisibilitySensor
      key={card._id}
      scrollCheck
      scrollThrottle={1}
      onChange={visibilityChange(card.type, index)} // index - при массиве
   >
   // выбирается компонент
      <ProductItem key={card.title} card={card} />
   </VisibilitySensor>

   const visibilityChange =
   // isVisible - true, когда элемент появляется на экране
      (type: string, index: number) => (isVisible: boolean) => {
         if (isVisible && pathProducts.includes(`/${type}`) && index > 5) {
            dispatch(
               scrollSaveActions.setScrollPosition({
                  position: window.pageYOffset,
                  path: `/${type}`,
               }),
            );
         }
      };

   ```

   -  если используется createBrowserRouter из react-router-dom 6.4 и выше

      -  отключить автоматический [scrollRestoration](https://reactrouter.com/en/main/components/scroll-restoration)

   ```javascript
   useEffect(() => {
      // переключаем в ручной режим
      if ('scrollRestoration' in window.history) {
         window.history.scrollRestoration = 'manual';
      }
   }, []);

   // получаем id карты и прокручиваем скролл
   // scrollIntoView работает не во всех браузерах. Пришлось использовать scrollTo (не идеально) =====
   useEffect(() => {
      if (scrollCardId[pathname] && scrollCardId[pathname].cardId) {
         const card = document.getElementById(scrollCardId[pathname].cardId);
         console.log('card:', card);
         card?.scrollIntoView({
            behavior: animationScroll ? 'smooth' : 'auto',
            block: 'center',
         });
      } else {
         window.scrollTo({
            top: pathname === '/' ? 0 : 600,
            behavior: animationScroll ? 'smooth' : 'auto',
         });
      }
   }, [scrollCardId]);
   // =================================================================================


      const moveScroll = (pos: number) => {
      window.scrollTo({
         top: pos,
         behavior: animationScroll ? 'smooth' : 'auto',
      });
   };

   useEffect(() => {
      if (!pathProducts.includes(pathname)) {
         moveScroll(0);
      } else if (scrollCard[pathname] && scrollCard[pathname].position) {
         //* запоминает данные скрола  при переходе на другую страницу (для обновления компонента)
         setScrollData({
            path: scrollCard[pathname].path,
            position: scrollCard[pathname].position,
         });
      }
   }, [pathname]);

   useEffect(() => {
      if (pathProducts.includes(pathname)) {
         if (scrollCard[pathname] && scrollCard[pathname].position) {
            moveScroll(scrollData.position);
         } else {
            moveScroll(600);
         }
      }
   }, [pathname, scrollData]);
   ```
