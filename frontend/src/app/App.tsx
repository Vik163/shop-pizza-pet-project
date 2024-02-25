import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
   csrfTokenActions,
   fetchCsrfToken,
   getInited,
   initAuthData,
   userAction,
} from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme';

const App = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const inited = useSelector(getInited);
   const [searchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);
   const { theme } = useTheme();

   useEffect(() => {
      const userId = localStorage.getItem('userId');
      // Авторизация Яндекс
      if (initYaData) {
         fetchCsrfToken()
            .then((csrfToken) => {
               if (csrfToken) dispatch(csrfTokenActions.setToken(csrfToken));
               dispatch(userAction.setAuthData(userYaData));
               // if (userId) dispatch(initAuthData(userId));
               // убираю query ответ
               navigate('/');
            })
            .catch((err) => {
               console.log(err);
            });
      }

      // Обновление сессии по пользователю
      if (userId && !inited) {
         fetchCsrfToken()
            .then((csrfToken) => {
               if (csrfToken) dispatch(csrfTokenActions.setToken(csrfToken));
               dispatch(initAuthData(userId));
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [dispatch, initYaData, inited, navigate, userYaData]);

   return (
      <div className={classNames('app', {}, [theme])}>
         <Header />
         <AppRouter />
         <Footer />
      </div>
   );
};

export default App;
