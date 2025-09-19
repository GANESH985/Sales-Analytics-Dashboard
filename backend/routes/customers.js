import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '', region = '', type = '' } = req.query;
    
    const mockCustomers = [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', region: 'North', type: 'Enterprise', createdAt: '2023-01-15' },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', region: 'South', type: 'Business', createdAt: '2023-02-20' },
      { id: '3', name: 'Carol Davis', email: 'carol@example.com', region: 'East', type: 'Individual', createdAt: '2023-03-10' },
      { id: '4', name: 'David Wilson', email: 'david@example.com', region: 'West', type: 'Business', createdAt: '2023-04-05' },
      { id: '5', name: 'Eva Brown', email: 'eva@example.com', region: 'Central', type: 'Enterprise', createdAt: '2023-05-12' }
    ];

    const skip = (page - 1) * limit;
    const customers = mockCustomers.slice(skip, skip + parseInt(limit));
    const total = mockCustomers.length;

    res.json({
      customers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Customers error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mockCustomer = {
      id: req.params.id,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      region: 'North',
      type: 'Enterprise',
      createdAt: '2023-01-15'
    };

    res.json(mockCustomer);
  } catch (error) {
    console.error('Customer by ID error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;