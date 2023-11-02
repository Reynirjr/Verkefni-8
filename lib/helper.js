export function formatNumber(price) {
  const formatter = new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
  
    currencyDisplay: 'code'
  });

  return formatter.format(price).replace('ISK', '') + ' kr.-';
}