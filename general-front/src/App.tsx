import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes';
import { theme } from '@libs/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/react-query';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
