import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { DashboardScreen, GoogleSignInScreen } from '@screens';

function AuthorizedRoute() {
  return <Outlet />;
}

function UnAuthorizedRoute() {
  return <Outlet />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedRoute />}>
          <Route path="/" element={<DashboardScreen />} />
        </Route>
        <Route element={<UnAuthorizedRoute />}>
          <Route path="/sign-in" element={<GoogleSignInScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
