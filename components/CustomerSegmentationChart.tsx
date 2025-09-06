
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { CustomerSegment } from '../types';

interface CustomerSegmentationChartProps {
  data?: CustomerSegment[] | null;
  loading: boolean;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const ChartLoader: React.FC = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
);


export const CustomerSegmentationChart: React.FC<CustomerSegmentationChartProps> = ({ data, loading }) => {
  if (loading || !data) {
    return <ChartLoader />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend wrapperStyle={{ color: '#9CA3AF' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};
