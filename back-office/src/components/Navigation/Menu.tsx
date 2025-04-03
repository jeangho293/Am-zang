import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function MultiMenu() {
  // 1. destructure props
  // 2. lib hooks
  const navigator = useNavigate();
  const location = useLocation();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return <div>fds</div>;
}

function SingleMenu(props: { name: string; path: string }) {
  // 1. destructure props
  const { name, path } = props;

  // 2. lib hooks
  const navigator = useNavigate();
  const location = useLocation();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const selected = location.pathname === path;
  // 7. effect hooks
  // 8. handlers
  return (
    <Button
      onClick={() => navigator(path)}
      css={selected ? { borderBottom: '2px solid #015dee', borderRadius: '4px 4px 0px 0px' } : {}}
    >
      {name}
    </Button>
  );
}

export { MultiMenu, SingleMenu };
