import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '', category = '' } = req.query;
    
    const mockProducts = [
      { id: '1', name: 'Wireless Headphones', sku: 'WH001', category: 'Electronics', price: 299.99, createdAt: '2023-01-10' },
      { id: '2', name: 'Running Shoes', sku: 'RS002', category: 'Sports', price: 129.99, createdAt: '2023-01-15' },
      { id: '3', name: 'Coffee Maker', sku: 'CM003', category: 'Home & Garden', price: 89.99, createdAt: '2023-01-20' },
      { id: '4', name: 'Smartphone Case', sku: 'SC004', category: 'Electronics', price: 24.99, createdAt: '2023-01-25' },
      { id: '5', name: 'Yoga Mat', sku: 'YM005', category: 'Sports', price: 39.99, createdAt: '2023-02-01' }
    ];

    const skip = (page - 1) * limit;
    const products = mockProducts.slice(skip, skip + parseInt(limit));
    const total = mockProducts.length;

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mockProduct = {
      id: req.params.id,
      name: 'Wireless Headphones',
      sku: 'WH001',
      category: 'Electronics',
      price: 299.99,
      createdAt: '2023-01-10'
    };

    res.json(mockProduct);
  } catch (error) {
    console.error('Product by ID error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;