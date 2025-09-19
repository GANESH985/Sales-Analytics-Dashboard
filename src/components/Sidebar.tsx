import React from 'react';
import { BarChart3, TrendingUp, Users, Package, Settings, Home } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'analytics', name: 'Analytics', icon: TrendingUp },
  { id: 'customers', name: 'Customers', icon: Users },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 w-full lg:w-64 bg-white shadow-lg lg:static lg:inset-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <span className="ml-3 text-lg font-semibold text-gray-900">Analytics</span>
      </div>
      
      <nav className="mt-4 lg:mt-8">
        <div className="px-3 space-y-1 flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full lg:w-auto flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                <span className="hidden sm:inline lg:inline">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}