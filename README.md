# Lensify — AI-Powered Eyewear E-Commerce

> Final Year Project | COMSATS University Islamabad, Sahiwal Campus | BS Computer Science | 2026

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue)](https://lensify-psi.vercel.app)

---

## About

Lensify is a full-stack AI-powered eyewear e-commerce platform built for the Pakistani market. It features real-time Virtual Try-On using MediaPipe face detection, an AI chatbot powered by Llama 3.2, face shape based frame recommendations, and a complete e-commerce flow with Cash on Delivery.

---

## Live Demo

🌐 **[https://lensify-psi.vercel.app](https://lensify-psi.vercel.app)**

**Test Accounts:**
| Role | Email | Password |
|------|-------|----------|
| Customer | test@gmail.com | test123 |
| Admin | (set role to admin in MongoDB) | — |

---

## Features

### Customer Features
- 🔐 Register / Login with JWT authentication
- 👓 Virtual Try-On — real-time AR glasses overlay using MediaPipe Face Mesh (468 landmarks)
- 🤖 AI Chatbot — powered by Llama 3.2 via Ollama
- 🎯 Face Shape Recommendations — rule-based frame suggestions
- 🛍️ Shop with filters — category, shape, price range, sorting
- 🛒 Cart & Checkout — Cash on Delivery
- 📦 Order Tracking — by unique LNF order number
- 👤 Profile management

### Admin Features
- 📊 Dashboard — real revenue, orders, products stats
- 📦 Product management — add, edit, delete
- 🧾 Order management — update status
- 👥 Customer management
- 👔 Manager accounts — create and manage

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TailwindCSS, TypeScript |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + bcrypt |
| AI Chatbot | Ollama + Llama 3.2 |
| Virtual Try-On | MediaPipe Face Mesh |
| Deployment | Vercel + MongoDB Atlas |

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Ollama installed (for AI chatbot)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Rughena/lensify.git
cd lensify
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env.local` file**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lensify
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**4. Seed the database**
```bash
# Run the dev server first, then visit:
http://localhost:3000/api/seed
```

**5. Start Ollama (for AI chatbot)**
```bash
ollama serve
```

**6. Run the project**
```bash
npm run dev
```

**7. Open browser**
http://localhost:3000
---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/[id]` | Get single product |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/[id]` | Update product (admin) |
| DELETE | `/api/products/[id]` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user orders |
| POST | `/api/orders` | Create order |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI chatbot |

---

## Database Schema

### Users Collection
email, password (bcrypt hashed), firstName, lastName

phone, address, city, country, zipCode

role: customer | admin | manager

### Products Collection
name, description, price (PKR), discount

category: men | women | unisex | contacts

shape: oval | round | square | rectangle | cat-eye | hexagon

color, brand, material, imageUrl, stock, rating, reviews

### Orders Collection
userId, orderNumber (LNF-XXXXXX-XXX format)

items[], totalAmount, status

shippingAddress, paymentMethod

---

## Project Structure
lensify/

├── app/

│   ├── api/          # Backend API routes

│   ├── admin/        # Admin dashboard pages

│   ├── shop/         # Shop page

│   ├── try-on/       # Virtual Try-On page

│   ├── checkout/     # Checkout page

│   ├── payment/      # Payment page

│   └── dashboard/    # Customer dashboard

├── components/       # Reusable UI components

├── models/           # MongoDB Mongoose models

├── lib/              # Utility functions

└── public/           # Static assets & product images

---

## Documentation

📄 Full project report available in [`/docs/Lensify_FYP_Report.pdf`](./docs/Lensify_FYP_Report.pdf)

---

## Developer

**Rughena** — BS Computer Science  
COMSATS University Islamabad, Sahiwal Campus  
GitHub: [@Rughena](https://github.com/Rughena)

---

## License
MIT