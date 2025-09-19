import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface SalesChartProps {
  data: any[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'revenue' || name === 'profit') {
      return [`₹${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Profit'];
    }
    return [value.toLocaleString(), 'Sales Count'];
  };

  const formatXAxisLabel = (tickItem: string) => {
    try {
      if (tickItem.includes('-')) {
        const parts = tickItem.split('-');
        if (parts.length === 3) {
          return format(new Date(tickItem), 'MMM dd');
        } else if (parts.length === 2) {
          return format(new Date(`${tickItem}-01`), 'MMM yyyy');
        }
      }
      return tickItem;
    } catch (error) {
      return tickItem;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Trends</h3>
        <p className="text-sm text-gray-600">Revenue and profit trends over time</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="_id" 
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Date: ${formatXAxisLabel(label)}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: 'white' }}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Profit</span>
        </div>
      </div>
    </div>
  );
}