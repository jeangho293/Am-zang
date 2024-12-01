import { Button } from '@mui/material';
import { useSignOut } from '@libs';

function DashboardScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [signOut] = useSignOut();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <div>
      <Button onClick={signOut}>Logout</Button>
    </div>
  );
}

export { DashboardScreen };
