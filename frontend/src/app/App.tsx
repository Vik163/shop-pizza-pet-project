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
