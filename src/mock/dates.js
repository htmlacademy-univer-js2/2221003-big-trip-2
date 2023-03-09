import dayjs from 'dayjs';
import { getRandomPositiveInteger } from '../utils';

const getRandomDate = () => dayjs()
  .add(getRandomPositiveInteger(1, 3), 'day')
  .add(getRandomPositiveInteger(1, 10), 'hour')
  .add(getRandomPositiveInteger(1, 59), 'minute');

const createRandomDates = () => {
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  if (date1.isBefore(date2)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString()
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString()
  };
};

export { createRandomDates };
