import { AuthProvider, theme } from '@libs';
import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes';

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
