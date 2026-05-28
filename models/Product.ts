import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
  type: String,
  enum: ['men', 'women', 'unisex', 'contacts'],
  required: true,
},
    shape: {
      type: String,
      enum: ['oval', 'round', 'square', 'rectangle', 'cat-eye', 'hexagon'],
    },
    color: String,
    brand: String,
    material: String,
    imageUrl: String,
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
