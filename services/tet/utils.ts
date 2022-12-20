import { formatDistanceStrict } from 'date-fns';

export const getDistance = () => {
  let a = formatDistanceStrict(new Date(), new Date('01/21/2023'), {
    unit: 'day',
    roundingMethod: 'ceil',
  });

  return a.replace(/days/g, 'ngày');
};
