import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { items, totalAmount, shippingAddress, paymentMethod, prescriptionUrl } =
      await request.json();

    if (!items || !totalAmount || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items must be a non-empty array' }, { status: 400 });
    }

    await connectDB();

    const orderNumber = `LNF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    const order = new Order({
      userId: decoded.userId || decoded.id,
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'pending',
      prescriptionUrl,
      status: 'processing',
    });

    await order.save();
    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    let orders;

    if (orderNumber) {
      // Search by order number — any role can look up a specific order
      orders = await Order.find({ orderNumber: orderNumber.trim() });
      if (!orders || orders.length === 0) {
        return NextResponse.json({ error: 'No order found with this order number' }, { status: 404 });
      }

    } else if (['admin', 'manager'].includes(decoded.role)) {
      // ✅ Admin and manager see ALL orders from every customer
      orders = await Order.find({}).sort({ createdAt: -1 });

    } else {
      // ✅ Regular customers only see their own orders
      orders = await Order.find({ userId: decoded.userId || decoded.id }).sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}