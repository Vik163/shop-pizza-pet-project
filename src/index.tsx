import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';

import App from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ResizeProvider } from './app/providers/ResizeProvider';
import { StoreProvider } from './app/providers/StoreProvider';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
   <StrictMode>
      <StoreProvider>
         <ResizeProvider>
            <ThemeProvider>
               <App />
            </ThemeProvider>
         </ResizeProvider>
      </StoreProvider>
   </StrictMode>,
);
