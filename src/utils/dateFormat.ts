//@ts-ignore
import format from 'date-fns/format';

export function formatDate(d:Date) {
  return format(d, 'hh:mm iii d MMM y');
}