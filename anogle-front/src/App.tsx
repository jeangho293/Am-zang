import { ThemeProvider } from '@mui/material';
import { theme } from '@libs';
import { AppRouter } from './routes';
import { AuthProvider } from './libs/auth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
