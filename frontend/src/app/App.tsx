import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getInited, firebaseApi, initAuthData } from '@/entities/User';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';

const App = () => {
   const dispatch = useAppDispatch();
   const inited = useSelector(getInited);
   const auth = getAuth();
   const [searchParams, setSearchParams] = useSearchParams();
   const initYaData = searchParams.get('user');
   console.log(initYaData);

   // useEffect(() => {
   //    if (!inited) {
   //       // инициализация пользователя при запуске по  firebase user
   //       onAuthStateChanged(auth, (user) => {
   //          if (user) {
   //             firebaseApi.setTokens(user);
   //             console.log('Init');

   //             dispatch(initAuthData(user));
   //          }
   //       });
   //    }
   // }, []);

   return (
      <div className='app'>
         <Header />
         <AppRouter />
         <Footer />
      </div>
   );
};

export default App;
