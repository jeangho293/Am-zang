import { useQuery } from '@libs';
import { userRepository } from '@repositories';

function UserScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { data: users } = useQuery(userRepository.list);
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return <div>hi</div>;
}

export { UserScreen };
