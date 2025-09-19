import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      startDate,
      endDate,
      customerId,
      productId,
      status = 'completed'
    } = req.query;
    
    const mockSales = [
      {
        id: '1',
        customerId: { id: '1', name: 'Alice Johnson', region: 'North', type: 'Enterprise' },
        productId: { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 299.99 },
        quantity: 2,
        unitPrice: 299.99,
        totalRevenue: 599.98,
        profit: 180.00,
        saleDate: '2024-01-15',
        status: 'completed'
      },
      {
        id: '2',
        customerId: { id: '2', name: 'Bob Smith', region: 'South', type: 'Business' },
        productId: { id: '2', name: 'Running Shoes', category: 'Sports', price: 129.99 },
        quantity: 1,
        unitPrice: 129.99,
        totalRevenue: 129.99,
        profit: 40.00,
        saleDate: '2024-01-16',
        status: 'completed'
      }
    ];

    const skip = (page - 1) * limit;
    const sales = mockSales.slice(skip, skip + parseInt(limit));
    const total = mockSales.length;

    res.json({
      sales,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Sales error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mockSale = {
      id: req.params.id,
      customerId: { id: '1', name: 'Alice Johnson', region: 'North', type: 'Enterprise' },
      productId: { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 299.99 },
      quantity: 2,
      unitPrice: 299.99,
      totalRevenue: 599.98,
      profit: 180.00,
      saleDate: '2024-01-15',
      status: 'completed'
    };

    res.json(mockSale);
  } catch (error) {
    console.error('Sale by ID error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;