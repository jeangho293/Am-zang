import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AnogleLogo() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Link to="/" css={{ textDecoration: 'none', color: '#000000' }}>
      <Typography css={{ fontSize: '28px', fontWeight: 600 }}>Anogle</Typography>
    </Link>
  );
}

export { AnogleLogo };
