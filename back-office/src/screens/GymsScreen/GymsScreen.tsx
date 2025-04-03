import { useQuery } from '@libs/react-query';
import { gymRepository } from '@repositories';

export function GymsScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { data: gyms } = useQuery(gymRepository.list);

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return <div>gyms</div>;
}
