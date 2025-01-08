import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import cls from './ErrorPage.module.scss';
import { FontColor, Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { basketActions } from '@/entities/Basket';
import { firebaseApi, userAction } from '@/entities/User';
import { $api } from '@/shared/api/axiosApi';

export const ErrorPage = memo(() => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const error = localStorage.getItem('error') || 'Страница не найдена';

   const logout = async () => {
      dispatch(userAction.logout());
      dispatch(basketActions.setBasket({ basketProducts: [], totalPrice: 0 }));

      // выход из БД (возвращает булевое значение)
      await $api.get('/signout');

      // выход из firebase
      await firebaseApi.signout();

      localStorage.removeItem('error');
   };

   if (error === 'Ошибка авторизации') logout();

   const goBack = () => {
      if (window.history?.length && window.history.length > 1) {
         navigate(-1);
      } else {
         navigate('/', { replace: true });
      }
   };

   const goMainPage = () => {
      navigate('/', { replace: true });
      localStorage.removeItem('error');
   };

   return (
      <VStack className={cls.NotFoundPage} justify={FlexJustify.CENTER}>
         <Text fontColor={FontColor.TEXT_ORANGE} className={cls.title}>
            {error}
         </Text>

         <Button onClick={goMainPage} className={cls.btn}>
            <span className={cls.arrow}>&#10141;</span> &ensp; Перейти на
            главную страницу
         </Button>
         {error !== 'Ошибка авторизации' && (
            <Button onClick={goBack} className={cls.btn}>
               <span className={cls.arrow}>&#10141;</span> &ensp; Вернуться
               назад
            </Button>
         )}
      </VStack>
   );
});
