import dayjs from 'dayjs';

export function format(date: Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function now() {
  return dayjs().format('YYYY-MM-DD');
}
