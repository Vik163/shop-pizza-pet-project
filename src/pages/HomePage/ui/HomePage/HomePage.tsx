/* eslint-disable eqeqeq */
import React, { memo, useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import cls from './HomePage.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Header } from '@/widgets/Header';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { useGetUserDataByIdQuery, userAction } from '@/entities/User';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { Footer } from '@/widgets/Footer';
import { basketActions, useGetBasketQuery } from '@/entities/Basket';

export const HomePage = memo(() => {
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const basketPage = pathname === '/basket';

   const [searchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);
   if (userYaData && userYaData.userId)
      localStorage.setItem(LOCALSTORAGE_USER_KEY, userYaData.userId);

   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
   const errAuth = localStorage.getItem('error');
   const [skip, setSkip] = useState(Boolean(!userId));
   const { currentData } = useGetUserDataByIdQuery(userId!, {
      skip,
   });
   const { data } = useGetBasketQuery(userId!, {
      skip,
   });

   useEffect(() => {
      // Обновление сессии по пользователю
      if (userId) {
         setSkip(false);
      } else {
         setSkip(true);
      }
   }, [userId]);

   useEffect(() => {
      // Обновление сессии по пользователю
      if (currentData && !errAuth) {
         dispatch(userAction.setAuthData(currentData));
      }
   }, [currentData, dispatch, errAuth]);

   useEffect(() => {
      // Обновление сессии по пользователю
      if (data && !errAuth) {
         dispatch(basketActions.setBasket(data));
      }
   }, [data, dispatch, errAuth]);

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
