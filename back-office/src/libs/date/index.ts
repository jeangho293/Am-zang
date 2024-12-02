import dayjs from 'dayjs';

export function format(date: Date | string, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}
