# Sales Analytics Dashboard

A comprehensive MERN stack application for sales data analysis and visualization, featuring advanced MongoDB aggregation pipelines, interactive charts, and real-time analytics.

## 🚀 Features

### Backend Features
- **MongoDB Database**: Comprehensive sales data with customers, products, and sales collections
- **Advanced Aggregation**: MongoDB aggregation pipelines for complex analytics
- **RESTful APIs**: Express.js APIs with date-range filtering and validation
- **Data Seeding**: Automated scripts to generate 2+ years of sample data
- **Error Handling**: Robust error handling and validation middleware

### Frontend Features
- **Interactive Dashboard**: Real-time sales analytics with dynamic filtering
- **Date Range Selection**: Flexible date picker with preset ranges
- **Data Visualization**: Interactive charts using Recharts library
- **Responsive Design**: Mobile-first design optimized for all devices
- **Professional UI**: Modern design with smooth animations and micro-interactions

### Analytics Capabilities
- **Revenue Analysis**: Total revenue, profit, and sales trends
- **Top Performers**: Best-selling products and highest-value customers
- **Regional Insights**: Sales performance by geographic region
- **Category Analysis**: Product category performance metrics
- **Time Series**: Trend analysis with daily/weekly/monthly intervals

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with aggregation pipelines
- **Mongoose** - ODM for MongoDB

### Frontend  
- **React** - Frontend framework with hooks
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization
- **React DatePicker** - Date selection
- **Lucide React** - Icon library

### Development Tools
- **Vite** - Build tool and dev server
- **Concurrently** - Run multiple scripts
- **Faker.js** - Generate sample data
- **Date-fns** - Date utilities

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd sales-analytics-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/sales_analytics
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
```

4. **Database Setup**
```bash
# Seed the database with sample data
npm run seed
```

5. **Start the application**
```bash
# Start both backend and frontend
npm run dev

# Or start individually:
npm run server  # Backend only
npm run client  # Frontend only
```

## 🗄 Database Schema

### Collections

#### Customers
```javascript
{
  name: String,
  email: String (unique),
  region: Enum ['North', 'South', 'East', 'West', 'Central'],
  type: Enum ['Individual', 'Business', 'Enterprise'],
  registrationDate: Date,
  isActive: Boolean
}
```

#### Products
```javascript
{
  name: String,
  category: Enum ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Health', 'Automotive'],
  price: Number,
  cost: Number,
  sku: String (unique),
  description: String,
  isActive: Boolean
}
```

#### Sales
```javascript
{
  customerId: ObjectId (ref: Customer),
  productId: ObjectId (ref: Product),
  quantity: Number,
  unitPrice: Number,
  totalRevenue: Number,
  cost: Number,
  profit: Number,
  saleDate: Date,
  status: Enum ['completed', 'pending', 'cancelled']
}
```

## 📊 API Endpoints

### Analytics Endpoints
- `GET /api/analytics/overview` - Dashboard overview metrics
- `GET /api/analytics/top-products` - Best-selling products
- `GET /api/analytics/top-customers` - Highest-value customers
- `GET /api/analytics/regional-stats` - Regional performance
- `GET /api/analytics/sales-trends` - Time series trends
- `GET /api/analytics/category-stats` - Category performance

### Data Endpoints
- `GET /api/customers` - Customer list with pagination
- `GET /api/products` - Product catalog with filtering
- `GET /api/sales` - Sales records with filtering

### Query Parameters
- `startDate` & `endDate` - Date range filtering (YYYY-MM-DD)
- `page` & `limit` - Pagination
- `search` - Text search
- `category`, `region`, `type` - Filtering options

## 🎨 UI Components

### Dashboard Features
- **Metric Cards**: Revenue, sales count, average order value, profit
- **Interactive Charts**: Line charts for trends, pie charts for regional data
- **Data Tables**: Top products and customers with sorting
- **Date Selectors**: Preset ranges and custom date pickers
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages with retry options

### Responsive Design
- **Mobile**: < 768px - Stacked layout, simplified navigation
- **Tablet**: 768px - 1024px - Grid adjustments, compact charts
- **Desktop**: > 1024px - Full sidebar, multi-column layouts

## 🔍 MongoDB Aggregation Examples

### Revenue by Date Range
```javascript
Sale.aggregate([
  { $match: { saleDate: { $gte: startDate, $lte: endDate }, status: 'completed' } },
  { $group: { _id: null, totalRevenue: { $sum: '$totalRevenue' } } }
])
```

### Top Products with Lookup
```javascript
Sale.aggregate([
  { $match: { saleDate: { $gte: startDate, $lte: endDate } } },
  { $group: { _id: '$productId', totalRevenue: { $sum: '$totalRevenue' } } },
  { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 }
])
```

## 🚦 Performance Optimizations

### Database
- Indexed fields: `saleDate`, `customerId`, `productId`, `region`
- Efficient aggregation pipelines with `$match` first
- Batch data seeding for large datasets

### Frontend
- React component optimization with proper key props
- Debounced date picker updates
- Responsive chart sizing
- Loading states for better UX

## 🧪 Development

### Available Scripts
```bash
npm run dev      # Start full development environment
npm run server   # Backend development server  
npm run client   # Frontend development server
npm run build    # Production build
npm run seed     # Seed database with sample data
```

### Code Structure
```
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # Express routes  
│   ├── middleware/      # Custom middleware
│   └── scripts/         # Database seeding
├── src/
│   ├── components/      # React components
│   ├── services/        # API client
│   └── types/           # TypeScript definitions
```

## 🔧 Configuration

### MongoDB Configuration
- **Local**: `mongodb://localhost:27017/sales_analytics`
- **Atlas**: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/sales_analytics`

### Environment Variables
- `MONGODB_URI` - Database connection string
- `PORT` - Backend server port
- `VITE_API_URL` - Frontend API endpoint

## 📈 Sample Data

The seeding script generates:
- **500 customers** across all regions and types
- **100 products** across 7 categories
- **5000+ sales records** spanning 2+ years
- **Realistic data** with proper relationships and business logic

## 🎯 Usage Tips

1. **Date Ranges**: Use preset buttons for common ranges or custom picker for specific periods
2. **Performance**: Larger date ranges may take longer to process
3. **Data Refresh**: Re-run `npm run seed` to generate fresh sample data
4. **Mobile**: Swipe horizontally on tables for better mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

Built with ❤️ for the MERN Stack Developer Assignment