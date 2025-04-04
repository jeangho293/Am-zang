import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInScreen } from '@screens';

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
        <Route path="/sign-in" element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
