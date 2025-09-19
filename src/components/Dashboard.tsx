import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import DateRangeSelector from './DateRangeSelector';
import MetricCard from './MetricCard';
import SalesChart from './SalesChart';
import TopProductsTable from './TopProductsTable';
import TopCustomersTable from './TopCustomersTable';
import RegionalChart from './RegionalChart';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import * as api from '../services/api';

interface DashboardData {
  overview: any;
  trends: any[];
  topProducts: any[];
  topCustomers: any[];
  regionalStats: any[];
  categoryStats: any[];
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  });
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async (start: Date, end: Date) => {
    setLoading(true);
    setError(null);
    
    try {
      const startStr = format(start, 'yyyy-MM-dd');
      const endStr = format(end, 'yyyy-MM-dd');

      const [overview, trends, topProducts, topCustomers, regionalStats, categoryStats] = await Promise.all([
        api.getOverview(startStr, endStr),
        api.getSalesTrends(startStr, endStr),
        api.getTopProducts(startStr, endStr, 10),
        api.getTopCustomers(startStr, endStr, 10),
        api.getRegionalStats(startStr, endStr),
        api.getCategoryStats(startStr, endStr)
      ]);

      setData({
        overview,
        trends,
        topProducts,
        topCustomers,
        regionalStats,
        categoryStats
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ startDate: start, endDate: end });
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => fetchDashboardData(dateRange.startDate, dateRange.endDate)}
      />
    );
  }

  if (!data) {
    return <ErrorMessage message="No data available" />;
  }

  const { overview, trends, topProducts, topCustomers, regionalStats, categoryStats } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Sales performance from {format(dateRange.startDate, 'MMM dd, yyyy')} to {format(dateRange.endDate, 'MMM dd, yyyy')}
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <DateRangeSelector
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Total Revenue"
          value={`₹${overview.totalRevenue?.toLocaleString() || 0}`}
          change="+12.5%"
          trend="up"
          icon="dollar"
        />
        <MetricCard
          title="Total Sales"
          value={overview.totalSales?.toLocaleString() || 0}
          change="+8.2%"
          trend="up"
          icon="shopping"
        />
        <MetricCard
          title="Avg Order Value"
          value={`₹${Math.round(overview.avgOrderValue || 0).toLocaleString()}`}
          change="+4.1%"
          trend="up"
          icon="trend"
        />
        <MetricCard
          title="Total Profit"
          value={`₹${overview.totalProfit?.toLocaleString() || 0}`}
          change="+15.3%"
          trend="up"
          icon="profit"
        />
      </div>

   
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesChart data={trends} />
        <RegionalChart data={regionalStats} />
      </div>

    
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopProductsTable products={topProducts} />
        <TopCustomersTable customers={topCustomers} />
      </div>
    </div>
  );
}