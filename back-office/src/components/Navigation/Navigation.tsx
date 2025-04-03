import { Stack } from '@mui/material';
import { MultiMenu, SingleMenu } from './Menu';

export function Navigation() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handler
  return (
    <Stack>
      <SingleMenu name="USER" path="/users" />
    </Stack>
  );
}
