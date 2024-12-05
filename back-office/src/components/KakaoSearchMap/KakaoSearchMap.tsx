import { Map } from 'react-kakao-maps-sdk';

function KakaoSearchMap(props: { className?: string }) {
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
    <Map
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      level={3}
      className={className}
    />
  );
}

export { KakaoSearchMap };
