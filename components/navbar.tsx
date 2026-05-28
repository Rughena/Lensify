'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Menu, X, Search, ShoppingCart, User, LogOut, Heart, LayoutDashboard } from 'lucide-react';

// ── Role badge colours & labels ────────────────────────────────────────────────
const ROLE_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  admin: {
    label: 'Admin',
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  manager: {
    label: 'Manager',
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  customer: {
    label: 'Customer',
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
};

// ── Dashboard link per role ────────────────────────────────────────────────────
function getDashboardLink(role: string) {
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'manager') return '/manager/dashboard';
  return '/dashboard';
}

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);

      const wishlist = JSON.parse(localStorage.getItem('lensify_wishlist') || '[]');
      setWishlistCount(wishlist.length);

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateUserFromStorage();
    window.addEventListener('storage', updateUserFromStorage);
    window.addEventListener('userLoggedIn', updateUserFromStorage);
    return () => {
      window.removeEventListener('storage', updateUserFromStorage);
      window.removeEventListener('userLoggedIn', updateUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('lensify_wishlist');
    setUser(null);
    setCartCount(0);
    setWishlistCount(0);
    window.location.href = '/';
  };

  const roleConfig = user ? (ROLE_CONFIG[user.role] ?? ROLE_CONFIG.customer) : null;
  const dashboardLink = user ? getDashboardLink(user.role) : '/';

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* ── Logo ─────────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
  <div className="relative">
    {/* Pulse ring */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 animate-ping opacity-20 group-hover:opacity-40"></div>
    {/* Icon box */}
    <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
      <svg width="22" height="22" viewBox="0 0 80 80" fill="none">
        {/* Left lens */}
        <rect x="10" y="22" width="26" height="22" rx="11" fill="none" stroke="white" strokeWidth="7"/>
        {/* Right lens */}
        <rect x="44" y="22" width="26" height="22" rx="11" fill="none" stroke="white" strokeWidth="7"/>
        {/* Bridge */}
        <line x1="36" y1="33" x2="44" y2="33" stroke="white" strokeWidth="7" strokeLinecap="round"/>
        {/* Left temple */}
        <line x1="10" y1="33" x2="2" y2="30" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        {/* Right temple */}
        <line x1="70" y1="33" x2="78" y2="30" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        {/* Reflection dots */}
        <circle cx="18" cy="27" r="4" fill="white" fillOpacity="0.4"/>
        <circle cx="52" cy="27" r="4" fill="white" fillOpacity="0.4"/>
      </svg>
    </div>
  </div>
  {/* Wordmark */}
  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
    Lensify
  </span>
  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
    Lensify
  </span>
</Link>

          {/* ── Desktop nav links ─────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/shop" className="text-xs lg:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link href="/try-on" className="text-xs lg:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Virtual Try-On
            </Link>
            <Link href="/recommendations" className="text-xs lg:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
  Find My Frame
</Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="relative group">
              <button className="text-xs lg:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Collections ▼
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/shop?category=men" className="block px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-lg">Men's Frames</Link>
                <Link href="/shop?category=women" className="block px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-50">Women's Frames</Link>
                <Link href="/shop?category=unisex" className="block px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-lg">Unisex</Link>
              </div>
            </div>
          </div>

          {/* ── Right section ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search frames..."
                className="w-40 px-3 py-2 bg-gray-100 rounded-lg text-xs placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute right-3 top-2 w-3 h-3 text-gray-400" />
            </div>

            {/* Wishlist — hide for non-customers */}
            {(!user || user.role === 'customer') && (
              <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart — hide for non-customers */}
            {(!user || user.role === 'customer') && (
              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* ── User dropdown ──────────────────────────────────────────────── */}
            {user ? (
              <div className="relative group">
                {/* Trigger button */}
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  {/* Avatar circle with first letter */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${roleConfig?.bg} ${roleConfig?.text}`}>
                    {user.firstName?.[0]?.toUpperCase() ?? <User className="w-4 h-4" />}
                  </div>

                  {/* Name + role badge (desktop only) */}
                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-sm font-semibold text-gray-800">{user.firstName}</span>
                    {/* Role pill */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleConfig?.bg} ${roleConfig?.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${roleConfig?.dot}`} />
                      {roleConfig?.label}
                    </span>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <span className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${roleConfig?.bg} ${roleConfig?.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${roleConfig?.dot}`} />
                      {roleConfig?.label}
                    </span>
                  </div>

                  {/* Dashboard link (all roles) */}
                  <Link
                    href={dashboardLink}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'manager' ? 'Manager Dashboard' : 'My Dashboard'}
                  </Link>

                  {/* Customer-only links */}
                  {user.role === 'customer' && (
                    <>
                      <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        My Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        My Wishlist
                      </Link>
                    </>
                  )}

                  {/* Admin-only shortcut */}
                  {user.role === 'admin' && (
                    <>
                      <Link href="/admin/products" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        Manage Products
                      </Link>
                      <Link href="/admin/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        Manage Orders
                      </Link>
                    </>
                  )}

                  {/* Manager-only shortcut */}
                  {user.role === 'manager' && (
                    <>
                      <Link href="/admin/analytics" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        Analytics
                      </Link>
                      <Link href="/admin/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        Orders & Dispatch
                      </Link>
                    </>
                  )}

                  {/* Sign out */}
                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-3 py-1.5">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="hidden sm:block">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-2 space-y-1">
            <Link href="/shop" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50">Shop</Link>
            <Link href="/try-on" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50">Virtual Try-On</Link>

            {user ? (
              <>
                {/* Role indicator in mobile */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg mx-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${roleConfig?.bg} ${roleConfig?.text}`}>
                    {user.firstName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${roleConfig?.bg} ${roleConfig?.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${roleConfig?.dot}`} />
                      {roleConfig?.label}
                    </span>
                  </div>
                </div>

                <Link href={dashboardLink} className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                  {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'manager' ? 'Manager Dashboard' : 'My Dashboard'}
                </Link>

                {user.role === 'customer' && (
                  <>
                    <Link href="/profile" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">My Profile</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">My Orders</Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link href="/admin/products" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Manage Products</Link>
                    <Link href="/admin/orders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Manage Orders</Link>
                  </>
                )}
                {user.role === 'manager' && (
                  <>
                    <Link href="/admin/analytics" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Analytics</Link>
                    <Link href="/admin/orders" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Orders & Dispatch</Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg">Sign In</Link>
                <Link href="/signup" className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">Create Account</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
