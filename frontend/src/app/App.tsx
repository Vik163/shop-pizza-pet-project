import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getInited, firebaseApi, initAuthData } from '@/entities/User';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const App = () => {
   const dispatch = useAppDispatch();
   const inited = useSelector(getInited);
   const auth = getAuth();

   // const body = `grant_type=authorization_code&code=${7410637}&client_id=${
   //    process.env.REACT_APP_YA_CLIENT_ID
   // }&client_secret=${process.env.REACT_APP_YA_CLIENT_SECRET}`;
   // //    grant_type: 'authorization_code',
   // //    code: 8339998,
   // //    client_id: process.env.REACT_APP_YA_CLIENT_ID,
   // //    client_secret: process.env.REACT_APP_YA_CLIENT_SECRET,
   // // };
   // const response = axios.post(`https://oauth.yandex.ru/token`, body, {
   //    // headers: {
   //    //    'Content-type': 'application/x-www-form-urlencoded',
   //    //    'Content-Length': 999,
   //    //    Authorization: 'Basic YGNsaWVudF9pZDpjbGllbnRfc2VjcmV0YA==',
   //    // },
   // });
   // console.log(response);

   useEffect(() => {
      if (!inited) {
         // инициализация пользователя при запуске по  firebase user
         onAuthStateChanged(auth, (user) => {
            if (user) {
               firebaseApi.setTokens(user);

               dispatch(initAuthData(user));
            }
         });
      }
   }, []);

   return (
      <div className='app'>
         <Header />
         <AppRouter />
         <Footer />
      </div>
   );
};

export default App;
