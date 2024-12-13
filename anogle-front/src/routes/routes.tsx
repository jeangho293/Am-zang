import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DashboardScreen, SignInScreen } from '@screens';
import { useUser } from '@libs';

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
  return !user ? <Navigate to="/sign-in" /> : <Outlet />;
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
  return !user ? <Outlet /> : <Navigate to="/" />;
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
        <Route element={<AuthorizedRoute />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>

        <Route element={<UnAuthorizedRoute />}>
          <Route path="sign-in" element={<SignInScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
