export enum ACTION_METHOD {
  BUY = 'BUY',
  SELL = 'SELL',
}
export interface IStock {
  label?: string;
  quantity?: number;
  created_date?: string;
  price?: string;
  action?: ACTION_METHOD;
}

export { IStock };
