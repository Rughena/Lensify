'use client';

import { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { wishlistStore, WishlistItem } from '@/lib/wishlistStore';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const items = wishlistStore.getWishlist();
    setWishlist(items);
    setLoading(false);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    wishlistStore.removeFromWishlist(productId);
    setWishlist(wishlist.filter((item) => item.productId !== productId));
  };

  const handleAddToCart = (item: WishlistItem) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((cartItem: any) => cartItem.productId === item.productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: item.productId,
        productName: item.productName,
        quantity: 1,
        price: item.price - (item.price * item.discount) / 100,
        imageUrl: item.imageUrl,
        brand: item.brand,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.productName} added to cart!`);
  };

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlistStore.clearWishlist();
      setWishlist([]);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8" />
              <h1 className="text-3xl sm:text-4xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-blue-100">{wishlist.length} items in your wishlist</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Save your favorite eyewear to view them later</p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Items</h2>
                <Button
                  onClick={handleClearWishlist}
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Clear Wishlist
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {wishlist.map((item) => {
                  const finalPrice = item.price - (item.price * item.discount) / 100;
                  return (
                    <Card key={item.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/products/${item.productId}`}>
                        <div className="bg-gray-100 aspect-square overflow-hidden">
                          <img
                            src={item.imageUrl || '/placeholder.svg?height=300&width=300&query=eyeglasses'}
                            alt={item.productName}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

                      <div className="p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                          {item.brand}
                        </p>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.productName}</h3>

                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-bold text-lg text-gray-900">Rs {finalPrice.toFixed(0)}</span>
                          {item.discount > 0 && (
                            <>
                              <span className="text-sm text-gray-400 line-through">Rs {item.price.toFixed(0)}</span>
                              <span className="text-xs font-bold text-red-600">{item.discount}% off</span>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg py-2 transition-all text-sm flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </Button>
                          <Button
                            onClick={() => handleRemoveFromWishlist(item.productId)}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 px-3"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
