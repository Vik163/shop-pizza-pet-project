import { createRoot } from 'react-dom/client';

import App from './app/App';
import '@/app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ResizeProvider } from './app/providers/ResizeProvider';

const container = document.getElementById('root');

if (!container) {
   throw new Error(
      'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
   );
}

const root = createRoot(container);

root.render(
   // <StrictMode>
   <StoreProvider>
      <ResizeProvider>
         <ThemeProvider>
            <App />
         </ThemeProvider>
      </ResizeProvider>
   </StoreProvider>,
   // </StrictMode>,
);
