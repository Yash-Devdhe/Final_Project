
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RegionalData } from '../types';

interface RegionalPerformanceChartProps {
  data: RegionalData[];
  loading: boolean;
}

const ChartLoader: React.FC = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
    </div>
);

export const RegionalPerformanceChart: React.FC<RegionalPerformanceChartProps> = ({ data, loading }) => {
  if (loading) {
    return <ChartLoader />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="region" tick={{ fill: '#9CA3AF' }} stroke="#374151" />
        <YAxis tick={{ fill: '#9CA3AF' }} stroke="#374151" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
        <Tooltip
          cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
          contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Bar dataKey="sales" fill="#10B981" background={{ fill: '#374151' }} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};
