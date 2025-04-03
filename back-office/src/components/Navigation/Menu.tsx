import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MultiMenu(props: { name: string; items: { name: string; path: string }[] }) {
  // 1. destructure props
  const { name, items } = props;

  // 2. lib hooks
  const navigator = useNavigate();
  const location = useLocation();

  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const open = Boolean(anchorEl);
  const selected = items.map(({ path }) => path).includes(location.pathname);

  // 7. effect hooks
  // 8. handlers
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        onClick={handleOpen}
        css={selected ? { borderBottom: '2px solid #015dee', borderRadius: '4px 4px 0px 0px' } : {}}
      >
        {name}
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {items.map(({ name, path }) => {
          return (
            <MenuItem
              onClick={() => {
                navigator(path);
                handleClose();
              }}
            >
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
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
