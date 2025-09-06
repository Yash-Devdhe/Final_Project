
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { SalesTrendChart } from './components/SalesTrendChart';
import { TopProductsChart } from './components/TopProductsChart';
import { CustomerSegmentationChart } from './components/CustomerSegmentationChart';
import { RegionalPerformanceChart } from './components/RegionalPerformanceChart';
import { ChartCard } from './components/ChartCard';
import { MOCK_SALES_DATA, MOCK_REGIONAL_DATA } from './services/mockData';
import { generateAnalytics } from './services/geminiService';
import type { SalesData, RegionalData, Forecast, CustomerSegment, ProductTrend } from './types';
import { RevenueIcon, SalesIcon, CustomerIcon, ProductIcon, UploadIcon, DownloadIcon } from './components/icons';

type AnalyticsState = {
  forecast: Forecast[];
  customerSegments: CustomerSegment[];
  productTrends: ProductTrend[];
  anomalies: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsState | null>(null);

  const totalRevenue = MOCK_SALES_DATA.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = MOCK_SALES_DATA.reduce((sum, item) => sum + item.unitsSold, 0);
  const totalCustomers = new Set(MOCK_SALES_DATA.map(item => item.customerId)).size;

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateAnalytics(MOCK_SALES_DATA);
      setAnalytics(result);
    } catch (err) {
      setError('Failed to fetch AI-powered analytics. Displaying mock data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // In a real app, you would process the file here.
      // For this demo, we'll just show an alert and re-fetch analytics.
      alert(`File "${event.target.files[0].name}" uploaded. Re-analyzing data...`);
      fetchAnalytics();
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <Header onFileUpload={handleFileUpload} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<RevenueIcon />} title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change="+12.5%" changeUp={true} />
          <StatCard icon={<SalesIcon />} title="Total Sales" value={totalSales.toLocaleString()} change="+8.1%" changeUp={true} />
          <StatCard icon={<CustomerIcon />} title="Active Customers" value={totalCustomers.toLocaleString()} change="-1.2%" changeUp={false} />
          <StatCard icon={<ProductIcon />} title="Top Product" value="Quantum Laptops" change="Model X" />
        </div>

        {error && <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard title="Monthly Sales Forecast">
              <SalesTrendChart salesData={MOCK_SALES_DATA} forecastData={analytics?.forecast} loading={loading} />
            </ChartCard>
          </div>

          <ChartCard title="Customer Segmentation">
            <CustomerSegmentationChart data={analytics?.customerSegments} loading={loading} />
          </ChartCard>
          
          <ChartCard title="Top Selling Products">
            <TopProductsChart data={analytics?.productTrends} loading={loading} />
          </ChartCard>
          
          <ChartCard title="Regional Performance">
            <RegionalPerformanceChart data={MOCK_REGIONAL_DATA} loading={false} />
          </ChartCard>

          <div className="lg:col-span-2 bg-surface rounded-xl shadow-lg p-6 hover:shadow-primary/20 transition-shadow duration-300">
             <h3 className="text-lg font-semibold text-text-primary mb-3">AI-Powered Anomaly Detection</h3>
             {loading ? (
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2.5"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
             ) : (
                <p className="text-text-secondary text-sm leading-relaxed">
                  {analytics?.anomalies || 'No significant anomalies detected in the current dataset.'}
                </p>
             )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
