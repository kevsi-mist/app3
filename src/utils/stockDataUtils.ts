
export const generatePriceData = (trend: 'up' | 'down', points = 14, volatility = 0.08) => {
  const data = [];
  let price = 1000 + Math.random() * 2000; // Higher base price for Indian stocks
  
  for (let i = 0; i < points; i++) {
    // Generate date (going backwards from today)
    const date = new Date();
    date.setDate(date.getDate() - (points - i));
    const dateStr = `${date.getDate()}/${date.getMonth() + 1}`;
    
    // Adjust price based on trend
    const change = price * (Math.random() * volatility) * (trend === 'up' ? 1 : -1);
    price = Math.max(price + change, 100); // Ensure price doesn't go below 100
    
    // Add small random noise
    price = price + (Math.random() * 50 - 25);
    
    // Calculate fiscal price (typically adjusted for splits, dividends, etc.)
    // For this simulation, we'll apply a small adjustment factor
    const fiscalAdjustment = 1 - (Math.random() * 0.05); // 0-5% adjustment
    const fiscalPrice = price * fiscalAdjustment;
    
    data.push({
      date: dateStr,
      price: parseFloat(price.toFixed(2)),
      fiscalPrice: parseFloat(fiscalPrice.toFixed(2))
    });
  }
  
  return data;
};

// Function to format price in Indian Rupees
export const formatIndianRupees = (amount: number): string => {
  return `₹${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2
  }).format(amount)}`;
};

// Function to format percentage
export const formatPercentage = (value: number): string => {
  const formatted = Math.abs(value).toFixed(2);
  return value >= 0 ? `+${formatted}%` : `-${formatted}%`;
};

// Function to calculate summary statistics
export const calculateMarketSummary = (stocks: { trend: 'up' | 'down' | 'neutral' }[]) => {
  const gainers = stocks.filter(stock => stock.trend === 'up').length;
  const losers = stocks.filter(stock => stock.trend === 'down').length;
  const neutral = stocks.filter(stock => stock.trend === 'neutral').length;
  
  return { gainers, losers, neutral };
};

// New function to adjust prices to fiscal values
export const adjustToFiscalPrice = (data: any[], adjustment = 0.97) => {
  return data.map(item => ({
    ...item,
    fiscalValue: item.value * adjustment,
    value: item.value // Keep the original for reference
  }));
};
