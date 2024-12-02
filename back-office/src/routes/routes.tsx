import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DashboardScreen, GoogleSignInCallbackScreen, GoogleSignInScreen } from '@screens';
import { useUser } from '@libs';
import { Header } from '@components';
import { Stack } from '@mui/material';

function AuthorizedRoute() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return !user ? (
    <Navigate to="/sign-in" />
  ) : (
    <Stack css={{ height: '100%' }}>
      <Header />
      <Stack css={{ padding: '16px' }}>
        <Outlet />
      </Stack>
    </Stack>
  );
}

function UnAuthorizedRoute() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return user ? <Navigate to="/" /> : <Outlet />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedRoute />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/users" element={<div>users</div>} />
        </Route>
        <Route element={<UnAuthorizedRoute />}>
          <Route path="/sign-in" element={<GoogleSignInScreen />} />
          <Route path="/auth/google" element={<GoogleSignInCallbackScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
