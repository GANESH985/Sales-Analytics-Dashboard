import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, BarChart3, Target } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: 'dollar' | 'shopping' | 'trend' | 'profit';
}

export default function MetricCard({ title, value, change, trend = 'neutral', icon }: MetricCardProps) {
  const iconComponents = {
    dollar: DollarSign,
    shopping: ShoppingBag,
    trend: BarChart3,
    profit: Target,
  };

  const IconComponent = iconComponents[icon];

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const bgColors = {
    dollar: 'bg-green-100 text-green-600',
    shopping: 'bg-blue-100 text-blue-600',
    trend: 'bg-purple-100 text-purple-600',
    profit: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600 mr-1" />}
              <span className={`text-sm font-medium ${trendColors[trend]}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last period</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${bgColors[icon]}`}>
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}