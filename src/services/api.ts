import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sales-analytics-dashboard-erjp.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid request parameters');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
);

export const getOverview = async (startDate: string, endDate: string) => {
  const response = await api.get('/analytics/overview', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getTopProducts = async (startDate: string, endDate: string, limit: number = 10) => {
  const response = await api.get('/analytics/top-products', {
    params: { startDate, endDate, limit }
  });
  return response.data;
};

export const getTopCustomers = async (startDate: string, endDate: string, limit: number = 10) => {
  const response = await api.get('/analytics/top-customers', {
    params: { startDate, endDate, limit }
  });
  return response.data;
};

export const getRegionalStats = async (startDate: string, endDate: string) => {
  const response = await api.get('/analytics/regional-stats', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getSalesTrends = async (startDate: string, endDate: string, interval: string = 'day') => {
  const response = await api.get('/analytics/sales-trends', {
    params: { startDate, endDate, interval }
  });
  return response.data;
};

export const getCategoryStats = async (startDate: string, endDate: string) => {
  const response = await api.get('/analytics/category-stats', {
    params: { startDate, endDate }
  });
  return response.data;
};


export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
