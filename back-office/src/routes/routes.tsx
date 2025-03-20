import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SignInScreen } from '@screens';
import { useUser } from '@libs/auth';

function AuthorizedRoute() {
  const [user] = useUser();

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}

function UnAuthorizedRoute() {
  const [user] = useUser();

  return user ? <Navigate to="/" /> : <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedRoute />}>
          <Route path="/" element={<div>hi</div>} />
        </Route>

        <Route element={<UnAuthorizedRoute />}>
          <Route path="/sign-in" element={<SignInScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
