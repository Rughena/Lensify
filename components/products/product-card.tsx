import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  brand: string;
}

export function ProductCard({
  id,
  name,
  price,
  discount,
  imageUrl,
  rating,
  reviews,
  brand,
}: ProductCardProps) {
  const finalPrice = price - (price * discount) / 100;

  return (
    <Link href={`/products/${id}`}>
      <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center aspect-square">
          <img
            src={imageUrl || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{discount}%
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col p-5">
          {/* Brand and Rating */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">{brand}</p>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-900">{rating}</span>
            </div>
          </div>
          
          <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-auto">{reviews} reviews</p>

          {/* Price */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rs {finalPrice.toFixed(0)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-gray-400 line-through">Rs {price.toFixed(0)}</span>
              )}
            </div>
            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
              <ShoppingCart className="w-4 h-4 text-gray-900 group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
