import { formatDistanceStrict } from 'date-fns';

export const getDistance = (endDate = '01/21/2023') => {
  let a = formatDistanceStrict(new Date(), new Date(endDate));
  return a.replace(/days/g, 'ngày');
};
