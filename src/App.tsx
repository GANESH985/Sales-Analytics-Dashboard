import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics';
import Customers from './components/Customers';
import Products from './components/Products';
import Settings from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        <div className="flex-1 w-full lg:ml-64">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <h1 className="ml-3 text-2xl font-bold text-gray-900">
                    Sales Analytics
                  </h1>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'analytics' && <Analytics />}
            {activeView === 'customers' && <Customers />}
            {activeView === 'products' && <Products />}
            {activeView === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;