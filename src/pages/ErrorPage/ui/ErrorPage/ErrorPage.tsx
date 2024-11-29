import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ErrorPage.module.scss';
import { FontColor, FontSize, Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { basketActions } from '@/entities/Basket';
import { firebaseApi, userAction, userLogout } from '@/entities/User';

interface ErrorPageProps {
   className?: string;
}

export const ErrorPage = memo((props: ErrorPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const error = localStorage.getItem('error') || 'Страница не найдена';

   const logout = async () => {
      dispatch(userAction.logout());
      dispatch(basketActions.setBasket({ basketProducts: [], totalPrice: 0 }));

      // выход из БД (возвращает булевое значение)
      await dispatch(userLogout());

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
      <VStack
         className={classNames(cls.NotFoundPage, {}, [className])}
         justify={FlexJustify.CENTER}
         gap={50}
      >
         <Text fontSize={FontSize.SIZE_38} fontColor={FontColor.TEXT_ORANGE}>
            {error}
         </Text>

         <Button fontSize={FontSize.SIZE_17} onClick={goMainPage}>
            🡰 &ensp; Перейти на главную страницу
         </Button>
         {error !== 'Ошибка авторизации' && (
            <Button fontSize={FontSize.SIZE_17} onClick={goBack}>
               🡰 &ensp; Вернуться назад
            </Button>
         )}
      </VStack>
   );
});
