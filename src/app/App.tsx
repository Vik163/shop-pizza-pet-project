import React, { memo } from 'react';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { AppRouter } from './providers/router';

const App = memo(() => {
   return <AppRouter />;
});

export default withTheme(App);
