import { useQuery } from '@libs/react-query';
import { usersRepository } from '@repositories';

export function UsersScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { data: users } = useQuery(usersRepository.list);

  console.log(users);
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return <div>user</div>;
}
