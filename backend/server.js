import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import analyticsRoutes from './routes/analytics.js';
import customersRoutes from './routes/customers.js';
import productsRoutes from './routes/products.js';
import salesRoutes from './routes/sales.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Connected to Supabase');
} else {
  console.log('⚠️  Supabase credentials not found. Please set up Supabase connection.');
}

app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});


app.use('/api/analytics', analyticsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/sales', salesRoutes);


app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Sales Analytics API is running!', 
    timestamp: new Date().toISOString(),
    database: supabase ? 'Supabase connected' : 'Database not configured'
  });
});

app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Dashboard: http://localhost:3000`);
  console.log(`API: http://localhost:${PORT}/api`);
  if (!supabase) {
    console.log('To connect to Supabase, click the "Connect to Supabase" button in the top right');
  }
});