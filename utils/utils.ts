export const gapPrice = (_first: any, _second: any) => {
  return Math.abs(_first / _second).toFixed(2);
};

export const sortByPrice = (list: { price: any }[]) => {
  return list.sort((a, b) => a.price - b.price);
};
