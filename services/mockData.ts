
import type { SalesData, RegionalData } from '../types';

export const MOCK_SALES_DATA: SalesData[] = [
  { month: 'Jan 24', year: 2024, revenue: 45000, unitsSold: 500, productId: 'P001', customerId: 'C001', region: 'North America' },
  { month: 'Feb 24', year: 2024, revenue: 48000, unitsSold: 520, productId: 'P002', customerId: 'C002', region: 'Europe' },
  { month: 'Mar 24', year: 2024, revenue: 52000, unitsSold: 550, productId: 'P003', customerId: 'C003', region: 'Asia' },
  { month: 'Apr 24', year: 2024, revenue: 58000, unitsSold: 600, productId: 'P004', customerId: 'C004', region: 'North America' },
  { month: 'May 24', year: 2024, revenue: 55000, unitsSold: 580, productId: 'P001', customerId: 'C005', region: 'South America' },
  { month: 'Jun 24', year: 2024, revenue: 60000, unitsSold: 620, productId: 'P002', customerId: 'C001', region: 'Europe' },
];

export const MOCK_REGIONAL_DATA: RegionalData[] = [
    { region: 'North America', sales: 180000 },
    { region: 'Europe', sales: 220000 },
    { region: 'Asia', sales: 150000 },
    { region: 'South America', sales: 95000 },
    { region: 'Africa', sales: 75000 },
    { region: 'Oceania', sales: 110000 },
];
