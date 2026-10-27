// Currency formatting helper for Indian Rupees (₹)
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return `₹${Math.round(Number(amount)).toLocaleString('en-IN')}`;
};

export const formatINR = formatPrice;
export const CURRENCY_SYMBOL = '₹';
