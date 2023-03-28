export const sumBalanceSpot = (pricess: any) => {
  let total = 0;
  pricess.map((item: any) => {
    total += parseFloat(item.usdt_value);
  });
  return total;
};

export const filterData = (balanceItems: any, tickers: any) => {
  return balanceItems
    .map(([key, itemValue]: any) => {
      if (key === 'USDT') {
        let usdtValue =
          parseFloat(itemValue.available) + parseFloat(itemValue.onOrder);
        let fusdtValue = usdtValue.toFixed(6);

        return {
          label: 'USDT',
          available: itemValue.available,
          onOrder: itemValue.onOrder,
          exchange_rate: 1,
          usdt_value: fusdtValue,
        };
      }

      let symbol = tickers[`${key}USDT`];
      if (!symbol) return null;

      let exchange_rate = parseFloat(tickers[`${key}USDT`]);
      let usdt_value =
        (parseFloat(itemValue.available) + parseFloat(itemValue.onOrder)) *
        exchange_rate;
      let usdtValue = usdt_value.toFixed(6);
      return {
        label: key,
        ...itemValue,
        exchange_rate: exchange_rate,
        usdt_value: usdtValue,
      };
    })
    .filter((item: any) => item);
};

export const sumFutureBalance = (futureBalance: any) => {
  let balance = 0;
  futureBalance
    .filter((item: any) => parseFloat(item.balance) > 0)
    .map((item: any) => {
      balance += parseFloat(item.balance);
    });
  return balance;
};
