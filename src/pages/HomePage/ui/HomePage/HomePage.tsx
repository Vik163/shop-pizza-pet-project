import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   Outlet,
   useLocation,
   useNavigate,
   useSearchParams,
} from 'react-router-dom';

import cls from './HomePage.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Header } from '@/widgets/Header';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { getInited, initAuthData, userAction } from '@/entities/User';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { fetchBasket } from '@/entities/Basket';
import { Footer } from '@/widgets/Footer';

export const HomePage = memo(() => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const inited = useSelector(getInited);
   const { pathname } = useLocation();
   const basketPage = pathname === '/basket';

   const [searchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   useEffect(() => {
      if (userId) dispatch(fetchBasket(userId));
   }, [userId]);

   useEffect(() => {
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
      <div className={classNames(cls.home, { [cls.basket]: basketPage }, [])}>
         {!basketPage && <Header />}

         {/* <Outlet> component для отображения дочерних элементов route */}
         <Outlet />
         <Footer />
         {/* Во вложенных компонентах работает некорректно */}
         {/* <ScrollRestoration
            getKey={(location, matches) => {
               return paths.includes(location.pathname)
                  ? location.pathname
                  : location.key;
            }}
         /> */}
      </div>
   );
});
