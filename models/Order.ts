import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,       // ← added so dashboard can show product name
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'test',
    },
    prescriptionUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);