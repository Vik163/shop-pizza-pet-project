import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
   getInited,
   firebaseApi,
   initAuthData,
   userAction,
} from '@/entities/User';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const App = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const inited = useSelector(getInited);
   const auth = getAuth();
   const [searchParams, setSearchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);

   useEffect(() => {
      if (initYaData) {
         dispatch(userAction.setAuthData(userYaData));
         // убираю query ответ
         navigate('/');
      }
      if (!inited) {
         // инициализация пользователя при запуске по  firebase user
         onAuthStateChanged(auth, (user) => {
            if (user) {
               firebaseApi.setTokens(user);
               console.log('Init');

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
