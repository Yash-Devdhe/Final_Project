
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ProductTrend } from '../types';

interface TopProductsChartProps {
  data?: ProductTrend[] | null;
  loading: boolean;
}

const ChartLoader: React.FC = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data, loading }) => {
  if (loading || !data) {
    return <ChartLoader />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" tick={{ fill: '#9CA3AF' }} stroke="#374151" />
        <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#9CA3AF' }} stroke="#374151" />
        <Tooltip
          cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Bar dataKey="unitsSold" fill="#3B82F6" background={{ fill: '#374151' }} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};
