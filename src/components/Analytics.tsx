import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, Calendar, Filter } from 'lucide-react';

export default function Analytics() {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [timeframe, setTimeframe] = useState('monthly');

  const metrics = [
    { id: 'revenue', name: 'Revenue Analysis', icon: TrendingUp, color: 'blue' },
    { id: 'sales', name: 'Sales Volume', icon: BarChart3, color: 'green' },
    { id: 'customers', name: 'Customer Growth', icon: Activity, color: 'purple' },
    { id: 'products', name: 'Product Performance', icon: PieChart, color: 'orange' }
  ];

  const analyticsData = {
    revenue: {
      current: '₹2,847,392',
      growth: '+18.2%',
      trend: 'up',
      data: [
        { month: 'Jan', value: 245000 },
        { month: 'Feb', value: 267000 },
        { month: 'Mar', value: 289000 },
        { month: 'Apr', value: 312000 },
        { month: 'May', value: 298000 },
        { month: 'Jun', value: 334000 }
      ]
    },
    sales: {
      current: '12,847',
      growth: '+12.5%',
      trend: 'up',
      data: [
        { month: 'Jan', value: 1850 },
        { month: 'Feb', value: 2100 },
        { month: 'Mar', value: 2350 },
        { month: 'Apr', value: 2200 },
        { month: 'May', value: 2450 },
        { month: 'Jun', value: 2650 }
      ]
    }
  };

  const insights = [
    {
      title: 'Peak Sales Period',
      description: 'June showed the highest sales volume with 2,650 transactions',
      impact: 'High',
      color: 'green'
    },
    {
      title: 'Revenue Growth',
      description: 'Consistent month-over-month growth averaging 8.5%',
      impact: 'High',
      color: 'blue'
    },
    {
      title: 'Customer Retention',
      description: 'Repeat customer rate increased to 68% this quarter',
      impact: 'Medium',
      color: 'purple'
    },
    {
      title: 'Product Mix',
      description: 'Electronics category driving 35% of total revenue',
      impact: 'Medium',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">
            Deep insights into your sales performance and trends
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? `border-${metric.color}-500 bg-${metric.color}-50`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center">
                <Icon className={`h-6 w-6 mr-3 ${
                  isSelected ? `text-${metric.color}-600` : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  isSelected ? `text-${metric.color}-900` : 'text-gray-700'
                }`}>
                  {metric.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {metrics.find(m => m.id === selectedMetric)?.name}
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900">
                {analyticsData[selectedMetric as keyof typeof analyticsData]?.current}
              </span>
              <span className="ml-2 text-sm font-medium text-green-600">
                {analyticsData[selectedMetric as keyof typeof analyticsData]?.growth}
              </span>
            </div>
          </div>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>

      
        <div className="h-64 flex items-end space-x-2">
          {analyticsData[selectedMetric as keyof typeof analyticsData]?.data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                style={{ 
                  height: `${(item.value / Math.max(...analyticsData[selectedMetric as keyof typeof analyticsData]!.data.map(d => d.value))) * 200}px` 
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 bg-${insight.color}-500`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                    insight.impact === 'High' 
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {insight.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="font-medium text-gray-900">3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Order Value</span>
              <span className="font-medium text-gray-900">$247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Lifetime Value</span>
              <span className="font-medium text-gray-900">$1,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Return Rate</span>
              <span className="font-medium text-gray-900">2.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="font-medium text-gray-900">4.7/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}