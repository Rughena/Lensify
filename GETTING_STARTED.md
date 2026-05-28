# Lensify - Getting Started Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables
Create a \`.env.local\` file with:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lensify
JWT_SECRET=your-super-secret-key-change-this
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 4. Seed Sample Data
Open http://localhost:3000/api/seed in your browser to populate sample products.

### 5. Access the App
- **Customer**: http://localhost:3000
- **Sign up** or use test account

## Test Accounts

### Admin Account
1. Sign up with any email
2. Manually set role to 'admin' in MongoDB (optional, for testing)
3. Access admin dashboard

### Customer Account
1. Click "Sign Up"
2. Fill in details
3. Automatically redirected to dashboard

## Key Features to Try

### Virtual Try-On
1. Go to **Try-On** page
2. Choose **Camera** or **Photo** mode
3. Grant camera permissions or upload photo
4. Adjust frame size/position
5. Download preview

### Shopping
1. Visit **Shop** page
2. Browse products or filter by category/shape
3. Click product for details
4. Add to cart
5. Proceed to checkout
6. Complete purchase

### AI Chatbot
- Click chat bubble in bottom right
- Ask about:
  - Lens types
  - Frame selection
  - Shipping info
  - Returns policy
  - Virtual try-on help

### Admin Dashboard
1. Create admin account
2. Access http://localhost:3000/admin/dashboard
3. Manage products, orders, and view analytics

## Directory Structure

\`\`\`
lensify/
├── app/
│   ├── api/              # API routes (backend)
│   ├── admin/            # Admin pages
│   ├── products/         # Product pages
│   ├── chat/             # Chat pages
│   ├── checkout/         # Checkout flow
│   ├── cart/             # Shopping cart
│   ├── dashboard/        # User dashboard
│   ├── login/            # Authentication
│   ├── try-on/           # Virtual try-on
│   └── page.tsx          # Homepage
├── components/
│   ├── auth/             # Login/signup forms
│   ├── products/         # Product components
│   ├── chatbot/          # Chat widget
│   └── virtual-tryon/    # VTO components
├── models/               # MongoDB schemas
├── lib/                  # Utilities
└── public/               # Assets
\`\`\`

## Common Tasks

### Add a New Product
1. Log in as admin
2. Go to **Manage Products**
3. Click **Add Product**
4. Fill in details
5. Click **Create Product**

### Update Order Status
1. Go to admin **Order Management**
2. Select new status from dropdown
3. Status updates instantly

### Debug Issues

**Database Connection Failed**
- Check MONGODB_URI is correct
- Ensure MongoDB is running/accessible
- Verify IP whitelist on MongoDB Atlas

**Payment Issues**
- This is a test app, payment is simulated
- No real charges made
- Check order status in admin dashboard

**Camera Not Working**
- Grant browser camera permissions
- Use HTTPS or localhost (required by browsers)
- Check camera is not in use by other apps

## Production Deployment

### Deploy to Vercel
\`\`\`bash
vercel
\`\`\`

### Deploy Backend
Use Render, Railway, or similar:
- Ensure MongoDB connection string is in production env
- Set JWT_SECRET to strong value
- Update NEXT_PUBLIC_API_URL to production domain

### Production Checklist
- [ ] Update JWT_SECRET to strong value
- [ ] Use production MongoDB Atlas connection
- [ ] Enable HTTPS
- [ ] Set up real payment gateway (optional)
- [ ] Configure email notifications
- [ ] Set up backup system
- [ ] Enable monitoring/logging

## Support

### Documentation
- SRS Document: See project root for detailed requirements
- API Routes: Check \`app/api\` folder for endpoint definitions
- Database Schema: Check \`models\` folder for data structures

### Troubleshooting
- Check browser console for errors
- Check terminal for server errors
- Verify environment variables
- Clear browser cache/cookies

## Next Steps

After getting familiar with the app:

1. **Customize Branding**
   - Update colors in globals.css
   - Replace logo in public folder
   - Update metadata in layout.tsx

2. **Add Real Payments**
   - Integrate Stripe/JazzCash/EasyPaisa
   - Update checkout component
   - Configure payment verification

3. **Improve AI Chatbot**
   - Fine-tune with more training data
   - Integrate with real AI service (Ollama, Dialogflow)
   - Add more FAQ categories

4. **Enhance Virtual Try-On**
   - Integrate MediaPipe for better face detection
   - Add 3D frame overlays
   - Implement frame size recommendations

5. **Add Mobile App**
   - Use React Native
   - Reuse backend APIs
   - Add camera native features

Enjoy building Lensify!
\`\`\`
