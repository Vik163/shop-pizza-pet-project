### Сохранение скролла

1. создаю фичу и вней слайс (объект, в котором сохраняется для каждого вида свой размер скролла)
2. логика в компоненте Page
3. флаги: hasScroll - есть свой скрол или нет, animationScroll - плавная перемотка
4. Если своего скролла нет, то используется окно браузера `window.scrollY`
5. функция onScroll вызывается событием `onScroll` или вешается слушатель `window.addEventListener('scroll', onScroll)`
6. onScroll сохраняет в стейт объект с path - имя страницы, position - положение скролла
7. возвращение скролла при переходе на другую страницу

   -  если без плавной прокрутки - значение присваивается мгновенно:

   ```javascript
   // есть свой скролл
   pageWithScrollRef.current.scrollTop = scroll[pathname];
   // нет
   window.scrollY = scroll[pathname];
   ```

   -  с плавной прокруткой:
      -  без использования ключа delayScroll сразу вызывалась функция onScroll и перезаписывалось не то значение
      -  delayScroll задерживает вызов функции пока идет анимация (время примерное подбором)

   ```javascript
   const [delayScroll, setDelayScroll] = useState(false);

   useEffect(() => {
      if (animationScroll) {
         // с анимацией
         const scrollWithoutPathname = pathname === '/' ? 0 : 600;
         window.scrollTo({
            top: scroll[pathname] ? scroll[pathname] : scrollWithoutPathname,
            behavior: 'smooth',
         });

         setDelayScroll(false);
         setTimeout(() => {
            setDelayScroll(true);
         }, 2000);
      } else if (hasScroll && !animationScroll) {
         // без анимации
         pageWithScrollRef.current.scrollTop = scroll[pathname];
      } else {
         window.scrollY = scroll[pathname];
      }
   }, [pathname]);

   useEffect(() => {
      if (!hasScroll && delayScroll) {
         window.addEventListener('scroll', onScroll);

         return () => {
            window.removeEventListener('scroll', onScroll);
         };
      }
   }, [delayScroll]);
   ```
