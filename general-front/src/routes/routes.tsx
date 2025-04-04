import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { SignInScreen, SignUpScreen } from '@screens';
import { Stack } from '@mui/material';
import { useUser } from '@libs/auth';

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
      {/* <Header /> */}
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
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <BrowserRouter>
      <Routes>
        {/* Authorized */}
        <Route element={<AuthorizedRoute />}>
          <Route index element={<div>hi</div>} />
        </Route>

        {/* UnAuthorized */}
        <Route element={<UnAuthorizedRoute />}>
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
