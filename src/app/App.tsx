import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import cls from './App.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { getInited, initAuthData, userAction } from '@/entities/User';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { fetchBasket } from '@/entities/Basket';

const App = memo(() => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const inited = useSelector(getInited);
   const { pathname } = useLocation();
   const basketPage = pathname === '/basket';

   const [searchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);

   useEffect(() => {
      dispatch(fetchBasket());
   }, []);

   useEffect(() => {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
      // Авторизация Яндекс
      if (initYaData && !inited) {
         // Запрос для получения токенов (из-за переадресации не получилось отправить с бека)
         dispatch(initAuthData(userYaData.userId))
            .then((data) => {
               if (data.payload) dispatch(userAction.setAuthData(userYaData));
               navigate('/');
            })
            .catch((err) => {
               console.log(err);
            });
      }

      // Обновление сессии по пользователю
      if (userId && !inited) {
         dispatch(initAuthData(userId)).catch((err) => {
            console.log(err);
         });
      }
   }, [dispatch, initYaData, inited, navigate, userYaData]);

   return (
      <div className={classNames(cls.app, { [cls.appBasket]: basketPage }, [])}>
         {!basketPage && <Header />}
         <AppRouter />
         <Footer />
      </div>
   );
});

export default withTheme(App);
