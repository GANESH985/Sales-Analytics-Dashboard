import express from 'express';

const router = express.Router();

router.get('/overview', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Start date and end date are required',
        message: 'Please provide both startDate and endDate parameters'
      });
    }

    const mockOverview = {
      totalRevenue: 165000,
      totalProfit: 48500,
      totalSales: 425,
      avgOrderValue: 388
    };

    res.json(mockOverview);
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-products', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    
    const mockProducts = [
      { _id: '1', productName: 'Wireless Headphones', category: 'Electronics', totalRevenue: 15000, totalSales: 50, orderCount: 45 },
      { _id: '2', productName: 'Running Shoes', category: 'Sports', totalRevenue: 12000, totalSales: 40, orderCount: 38 },
      { _id: '3', productName: 'Coffee Maker', category: 'Home & Garden', totalRevenue: 8000, totalSales: 20, orderCount: 20 },
      { _id: '4', productName: 'Smartphone Case', category: 'Electronics', totalRevenue: 6000, totalSales: 120, orderCount: 85 },
      { _id: '5', productName: 'Yoga Mat', category: 'Sports', totalRevenue: 4500, totalSales: 30, orderCount: 28 }
    ];

    res.json(mockProducts.slice(0, parseInt(limit)));
  } catch (error) {
    console.error('Top products error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-customers', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    
    const mockCustomers = [
      { _id: '1', customerName: 'Alice Johnson', region: 'North', type: 'Enterprise', totalRevenue: 25000, orderCount: 15 },
      { _id: '2', customerName: 'Bob Smith', region: 'South', type: 'Business', totalRevenue: 18000, orderCount: 12 },
      { _id: '3', customerName: 'Carol Davis', region: 'East', type: 'Individual', totalRevenue: 12000, orderCount: 8 },
      { _id: '4', customerName: 'David Wilson', region: 'West', type: 'Business', totalRevenue: 10000, orderCount: 6 },
      { _id: '5', customerName: 'Eva Brown', region: 'Central', type: 'Enterprise', totalRevenue: 8500, orderCount: 5 }
    ];

    res.json(mockCustomers.slice(0, parseInt(limit)));
  } catch (error) {
    console.error('Top customers error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/regional-stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const mockRegionalStats = [
      { region: 'North', revenue: 45000, salesCount: 120, customerCount: 25 },
      { region: 'South', revenue: 38000, salesCount: 95, customerCount: 20 },
      { region: 'East', revenue: 32000, salesCount: 85, customerCount: 18 },
      { region: 'West', revenue: 28000, salesCount: 75, customerCount: 15 },
      { region: 'Central', revenue: 22000, salesCount: 60, customerCount: 12 }
    ];

    res.json(mockRegionalStats);
  } catch (error) {
    console.error('Regional stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/sales-trends', async (req, res) => {
  try {
    const { startDate, endDate, interval = 'day' } = req.query;
    
    const mockTrends = [
      { _id: '2024-01-01', revenue: 5000, profit: 1500, salesCount: 15 },
      { _id: '2024-01-02', revenue: 6200, profit: 1800, salesCount: 18 },
      { _id: '2024-01-03', revenue: 4800, profit: 1400, salesCount: 12 },
      { _id: '2024-01-04', revenue: 7100, profit: 2100, salesCount: 22 },
      { _id: '2024-01-05', revenue: 5900, profit: 1700, salesCount: 16 },
      { _id: '2024-01-06', revenue: 6800, profit: 2000, salesCount: 20 },
      { _id: '2024-01-07', revenue: 5400, profit: 1600, salesCount: 14 }
    ];

    res.json(mockTrends);
  } catch (error) {
    console.error('Sales trends error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/category-stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const mockCategoryStats = [
      { category: 'Electronics', revenue: 35000, salesCount: 85, avgPrice: 412, totalQuantity: 95 },
      { category: 'Clothing', revenue: 28000, salesCount: 120, avgPrice: 233, totalQuantity: 140 },
      { category: 'Home & Garden', revenue: 22000, salesCount: 65, avgPrice: 338, totalQuantity: 75 },
      { category: 'Sports', revenue: 18000, salesCount: 55, avgPrice: 327, totalQuantity: 65 },
      { category: 'Books', revenue: 8000, salesCount: 200, avgPrice: 40, totalQuantity: 220 }
    ];

    res.json(mockCategoryStats);
  } catch (error) {
    console.error('Category stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;