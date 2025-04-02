import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { GymsScreen, SignInScreen } from '@screens';
import { useUser } from '@libs/auth';
import { Stack } from '@mui/material';
import { Header } from '@components';

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
  return user ? (
    <Stack css={{ width: '100%' }}>
      <Header />
      <Outlet />
    </Stack>
  ) : (
    <Navigate to="/sign-in" />
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

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedRoute />}>
          <Route path="/" element={<div>hi</div>} />
          <Route path="/gyms" element={<GymsScreen />} />
        </Route>

        <Route element={<UnAuthorizedRoute />}>
          <Route path="/sign-in" element={<SignInScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
