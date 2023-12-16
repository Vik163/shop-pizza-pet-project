import { Header } from '@/widgets/Header';
import { AppRouter } from './providers/router';
import { Footer } from '@/widgets/Footer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getInited, initAuthData } from '@/entities/User';
import { firebaseApi } from '@/entities/User/api/firebaseApi';
import axios from 'axios';
import { getUserData } from '@/entities/User/model/selectors/userDataSelector';
import { $apiPostGuard } from '@/shared/api/api';

const App = () => {
   const { getCurrentUser } = firebaseApi({});
   const userId = localStorage.getItem('userId');
   // const user = useSelector(getUserData);

   useEffect(() => {
      if (userId) {
         getCurrentUser();
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
