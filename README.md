# Lensify - AI-Powered E-commerce for Glasses & Lenses

A modern, full-stack e-commerce platform with virtual try-on, AI recommendations, and intelligent chatbot assistance built with Next.js, Node.js, MongoDB, and TensorFlow.js.

## Features

### Core Features
- **Virtual Try-On (VTO)**: Try glasses using webcam or photo upload with real-time overlay
- **AI Chatbot Assistant**: Intelligent customer support with product recommendations
- **Product Catalog**: Browse and filter glasses by shape, color, brand, and price
- **Face Recommendation Engine**: AI-powered frame suggestions based on face shape
- **Shopping Cart & Checkout**: Secure checkout with test payment simulation
- **Order Tracking**: Real-time order status updates
- **Admin Dashboard**: Manage products, orders, and view analytics

### Technical Stack
- **Frontend**: React.js, Next.js 16, TailwindCSS, TypeScript
- **Backend**: Node.js, Express.js, MongoDB Atlas
- **AI/ML**: TensorFlow.js, MediaPipe for virtual try-on
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Deployment**: Vercel, MongoDB Atlas, Render

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Environment Variables

Create a `.env.local` file in the project root:

\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lensify

# Authentication
JWT_SECRET=your-secret-key-here

# Deployment
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd lensify
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   - Copy the variables from the Environment Variables section above
   - Update with your actual MongoDB URI and JWT secret

4. **Seed the database** (Optional - adds sample products)
   \`\`\`bash
   curl -X POST http://localhost:3000/api/seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open browser**
   - Navigate to `http://localhost:3000`

## User Roles

### Customer
- Browse and search products
- Use virtual try-on feature
- Chat with AI assistant
- Add items to cart and checkout
- Track orders
- View order history

### Admin
- Manage product inventory (add/edit/delete)
- View all orders and update status
- View sales analytics and metrics
- Monitor inventory levels

## Testing the Application

### Test Accounts
- **Admin**: Admin accounts can be created via signup (set role to 'admin' in DB)
- **Customer**: Standard users created through signup form

### Sample Data
- Run `npm run seed` or POST to `/api/seed` to populate sample products

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

### Chat
- `POST /api/chat` - Send message to AI chatbot

## Features in Detail

### Virtual Try-On
- **Camera Mode**: Real-time try-on using device camera
- **Photo Mode**: Upload image and overlay frames
- **Adjustable**: Scale and position frame overlay
- **Export**: Download preview image

### AI Chatbot
- Answers FAQs about products, shipping, returns
- Provides frame recommendations
- Assists with order tracking
- Available 24/7 via chat widget

### Product Management
- Categories: Men, Women, Kids, Sunglasses
- Shapes: Oval, Round, Square, Rectangle, Cat-Eye
- Filters by color, brand, price range
- Stock management

## Deployment

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Deploy Backend
Use Render, Railway, or similar platforms for Node.js backend deployment.

## Database Schema

### User
- email, password, firstName, lastName
- phone, address, city, country, zipCode
- role (customer/admin), timestamps

### Product
- name, description, price, discount
- category, shape, color, brand, material
- imageUrl, stock, rating, reviews

### Order
- userId, items (cart items array)
- totalAmount, status, shippingAddress
- paymentMethod, prescriptionUrl, timestamps

## License
MIT

## Support
For issues or feature requests, please create an issue in the repository.
\`\`\`

```env.example file=".env.example"
# MongoDB Database Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lensify

# JWT Secret Key for Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Chatbot API Keys (for advanced integrations)
# GROQ_API_KEY=your-groq-api-key
# DIALOGFLOW_PROJECT_ID=your-dialogflow-project-id
