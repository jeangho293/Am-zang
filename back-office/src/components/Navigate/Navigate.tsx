import { Button as MuiButton, ButtonProps, Stack, styled, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Button = styled((props: Omit<ButtonProps, 'onClick'> & { to: string }) => {
  // props destructure
  const { children, to, className } = props;

  // lib hooks
  const navigator = useNavigate();
  const location = useLocation();

  // calculated values
  const selected = location.pathname === to;

  return (
    <Stack>
      <MuiButton
        onClick={() => {
          navigator(to);
        }}
        className={className}
        css={selected && { borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}
      >
        {children}
      </MuiButton>
      {selected && <Divider css={{ width: '100%', borderBottom: '2px solid #1861de' }} />}
    </Stack>
  );
})({
  'backgroundColor': 'inherit',
  'color': '#1861de',
  ':hover': {
    backgroundColor: '#4f87e833',
  },
});

function Navigate(props: { className?: string }) {
  // 1. destructure props
  const { className } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack direction="row" spacing={2} className={className} css={{ alignItems: 'center' }}>
      <Button to="/dashboard">대시보드</Button>
      <Button to="/users">사용자</Button>
      <Button to="/companies">암장</Button>
    </Stack>
  );
}

export { Navigate };
