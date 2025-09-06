
export interface SalesData {
  month: string;
  year: number;
  revenue: number;
  unitsSold: number;
  productId: string;
  customerId: string;
  region: string;
}

export interface RegionalData {
  region: string;
  sales: number;
}

export interface Forecast {
  month: string;
  predictedRevenue: number;
}

export interface CustomerSegment {
  name: string;
  value: number;
}

export interface ProductTrend {
  name: string;
  unitsSold: number;
}
