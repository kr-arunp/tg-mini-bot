export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
export const formatDate = (date: Date) => date.toISOString().split('T')[0];
