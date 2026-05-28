export interface WishlistItem {
  productId: string;
  productName: string;
  price: number;
  discount: number;
  imageUrl: string;
  brand: string;
  addedAt: number;
}

const WISHLIST_KEY = 'lensify_wishlist';

export const wishlistStore = {
  getWishlist: (): WishlistItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch {
      return [];
    }
  },

  addToWishlist: (item: WishlistItem): boolean => {
    const wishlist = wishlistStore.getWishlist();
    const exists = wishlist.some((w) => w.productId === item.productId);
    
    if (!exists) {
      wishlist.push({ ...item, addedAt: Date.now() });
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      return true;
    }
    return false;
  },

  removeFromWishlist: (productId: string): void => {
    const wishlist = wishlistStore.getWishlist();
    const filtered = wishlist.filter((w) => w.productId !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
  },

  isInWishlist: (productId: string): boolean => {
    const wishlist = wishlistStore.getWishlist();
    return wishlist.some((w) => w.productId === productId);
  },

  clearWishlist: (): void => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([]));
  },

  getWishlistCount: (): number => {
    return wishlistStore.getWishlist().length;
  },
};
