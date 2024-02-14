import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getInited, initAuthData, userAction } from '@/entities/User';

const App = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const inited = useSelector(getInited);
   const [searchParams] = useSearchParams();
   // Yandex query ответ
   const initYaData = searchParams.get('user');
   const userYaData = initYaData && JSON.parse(initYaData);

   useEffect(() => {
      const userId = localStorage.getItem('userId');
      try {
         if (initYaData) {
            dispatch(userAction.setAuthData(userYaData));
            if (userId) dispatch(initAuthData(userId));
            // убираю query ответ
            navigate('/');
         }

         if (userId && !inited) {
            dispatch(initAuthData(userId));
         }
      } catch (err) {
         console.log(err);
      }
   }, [dispatch, initYaData, inited, navigate, userYaData]);

   return (
      <div className='app'>
         <Header />
         <AppRouter />
         <Footer />
      </div>
   );
};

export default App;
