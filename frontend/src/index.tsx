import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { YMaps } from '@pbe/react-yandex-maps';
import App from './app/App';
import '@/app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
   throw new Error(
      'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
   );
}

const root = createRoot(container);

root.render(
   <StoreProvider>
      <BrowserRouter>
         <YMaps>
            <App />
         </YMaps>
      </BrowserRouter>
   </StoreProvider>,
);
