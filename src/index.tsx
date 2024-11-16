import { createRoot } from 'react-dom/client';

import App from './app/App';
import '@/app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ResizeProvider } from './app/providers/ResizeProvider';

// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// // eslint-disable-next-line camelcase, no-undef
// __webpack_nonce__ = window.__webpack_nonce__;
// // eslint-disable-next-line no-undef
// // @ts-ignore
// // eslint-disable-next-line no-undef
// console.log('__webpack_nonce__:', __webpack_nonce__);

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
