import { Stack, Pagination as MuiPagination } from '@mui/material';
import { useMemo } from 'react';

export function Pagination(props: {
  loading?: boolean;
  page: number;
  limit: number;
  totalCount?: number;
  onChange: (page: number) => void;
}) {
  // 1. destructure props
  const { loading, page = 1, limit, totalCount, onChange } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const count = useMemo(() => {
    if (totalCount !== undefined) {
      return Math.ceil(totalCount / limit);
    }
    return 1;
  }, [totalCount, limit]);

  // 7. effect hooks

  // 8. handlers
  return (
    <Stack>
      <MuiPagination
        size="small"
        page={page}
        count={count}
        onChange={(_, page) => onChange(page)}
      />
    </Stack>
  );
}
