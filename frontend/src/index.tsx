import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { YMaps } from '@pbe/react-yandex-maps';
import { StrictMode } from 'react';

import App from './app/App';
import '@/app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';

const container = document.getElementById('root');

if (!container) {
   throw new Error(
      'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
   );
}

const root = createRoot(container);

root.render(
   <StrictMode>
      <BrowserRouter>
         <StoreProvider>
            <ThemeProvider>
               <YMaps>
                  <App />
               </YMaps>
            </ThemeProvider>
         </StoreProvider>
      </BrowserRouter>
   </StrictMode>,
);
