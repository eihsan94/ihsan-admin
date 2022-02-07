import currency from 'currency.js'

export const JPY = (value: any) => currency(value, { precision: 0, symbol: '¥' });
