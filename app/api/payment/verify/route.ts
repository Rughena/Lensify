import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { orderId, gateway, transactionId, status } = data;

    if (!orderId || !gateway || !transactionId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    // Simulate payment verification
    if (status === 'success') {
      order.status = 'processing';
      order.paymentMethod = `${gateway} - ${transactionId}`;
      await order.save();

      return Response.json({
        success: true,
        message: 'Payment verified successfully',
        order,
      });
    } else {
      return Response.json({
        success: false,
        message: 'Payment verification failed',
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return Response.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
