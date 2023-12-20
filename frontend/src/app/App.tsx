import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getInited, firebaseApi } from '@/entities/User';

const App = () => {
   const dispatch = useAppDispatch();
   const inited = useSelector(getInited);

   useEffect(() => {
      if (!inited) {
         firebaseApi.getCurrentUser(dispatch);
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
