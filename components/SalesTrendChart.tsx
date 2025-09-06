import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SalesData, Forecast } from '../types';

interface SalesTrendChartProps {
  salesData: SalesData[];
  forecastData?: Forecast[] | null;
  loading: boolean;
}

const ChartLoader: React.FC = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);


export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ salesData, forecastData, loading }) => {
  if (loading) {
    return <ChartLoader />;
  }
  
  const formattedSalesData = salesData.map(d => ({
    month: d.month,
    Revenue: d.revenue,
  }));

  const formattedForecastData = forecastData?.map(d => ({
    month: d.month,
    Forecast: d.predictedRevenue,
  })) || [];

  // FIX: Explicitly type `combinedData` to allow for optional Revenue and Forecast properties,
  // resolving the type mismatch when merging historical and forecast data.
  const combinedData: ({ month: string; Revenue?: number; Forecast?: number })[] = [...formattedSalesData];

  formattedForecastData.forEach(forecastItem => {
    const existingIndex = combinedData.findIndex(d => d.month === forecastItem.month);
    if (existingIndex > -1) {
      combinedData[existingIndex] = { ...combinedData[existingIndex], ...forecastItem };
    } else {
      combinedData.push(forecastItem);
    }
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={combinedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} stroke="#374151" />
        <YAxis tick={{ fill: '#9CA3AF' }} stroke="#374151" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend wrapperStyle={{ color: '#9CA3AF' }} />
        <Line type="monotone" dataKey="Revenue" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
        <Line type="monotone" dataKey="Forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};
