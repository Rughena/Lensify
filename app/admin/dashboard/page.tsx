'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart3, Package, ShoppingCart, DollarSign, LogOut, Plus } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const STATUS_STYLES: Record<string, string> = {
  processing:    'bg-yellow-100 text-yellow-800',
  ready_to_ship: 'bg-blue-100 text-blue-800',
  shipped:       'bg-indigo-100 text-indigo-800',
  delivered:     'bg-green-100 text-green-800',
  cancelled:     'bg-red-100 text-red-800',
  pending:       'bg-gray-100 text-gray-800',
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(userData);
    fetchData(token);
  }, [router]);

  const fetchData = async (token: string) => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        // ✅ Pass token so API knows this is an admin requesting ALL orders
        fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products ?? data);
      }

      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(Array.isArray(data) ? data : []);
      } else {
        console.error('Orders fetch failed:', await ordersRes.text());
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!user) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingCount = orders.filter(o => o.status === 'processing' || o.status === 'pending').length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lensify Admin
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
              <Link href="/admin/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Products</Link>
              <Link href="/admin/orders" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Orders</Link>
              <Link href="/admin/customers" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Customers</Link>
              <Link href="/admin/analytics" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Analytics</Link>
              <Link href="/admin/managers" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Managers</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 text-sm rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 border-b border-gray-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user.firstName}</p>
          </div>
          {pendingCount > 0 && (
            <Link href="/admin/orders">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-medium rounded-xl">
                ⚠️ {pendingCount} order{pendingCount > 1 ? 's' : ''} need attention
              </span>
            </Link>
          )}
        </div>

        {/* KPI Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-bold mb-2">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-blue-900">Rs {totalRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-blue-600 mt-2">From {totalOrders} orders</p>
                </div>
                <DollarSign className="w-12 h-12 text-blue-300 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 uppercase tracking-wide font-bold mb-2">Total Orders</p>
                  <h3 className="text-3xl font-bold text-green-900">{totalOrders}</h3>
                  <p className="text-xs text-green-600 mt-2">
                    {orders.filter(o => o.status === 'delivered').length} delivered
                  </p>
                </div>
                <ShoppingCart className="w-12 h-12 text-green-300 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 uppercase tracking-wide font-bold mb-2">Products</p>
                  <h3 className="text-3xl font-bold text-purple-900">{totalProducts}</h3>
                  <p className="text-xs text-purple-600 mt-2">In inventory</p>
                </div>
                <Package className="w-12 h-12 text-purple-300 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-600 uppercase tracking-wide font-bold mb-2">Avg Order Value</p>
                  <h3 className="text-3xl font-bold text-orange-900">
                    Rs {totalOrders > 0 ? Math.round(totalRevenue / totalOrders).toLocaleString() : '0'}
                  </h3>
                  <p className="text-xs text-orange-600 mt-2">Per order</p>
                </div>
                <BarChart3 className="w-12 h-12 text-orange-300 opacity-50" />
              </div>
            </div>
          </div>
        )}

        {/* Recent Products + Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Recent Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Recent Products
              </h2>
              <Link href="/admin/products/new">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-2 mb-4">
                {products.slice(0, 5).map(product => (
                  <div key={product._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      {product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name}
                          className="w-10 h-8 object-contain rounded bg-white border border-gray-100" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">Rs {product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0  ? 'bg-yellow-100 text-yellow-800' :
                                           'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No products yet</p>
            )}

            <Link href="/admin/products">
              <Button className="w-full border border-purple-200 text-purple-600 hover:bg-purple-50 text-sm rounded-lg">
                View All Products
              </Button>
            </Link>
          </div>

          {/* Recent Orders — real data from MongoDB */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              Recent Orders
            </h2>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-2 mb-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        #{order.orderNumber ?? order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.items?.length ?? 0} item(s) · Rs {order.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status?.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No orders yet</p>
            )}

            <Link href="/admin/orders">
              <Button className="w-full border border-green-200 text-green-600 hover:bg-green-50 text-sm rounded-lg">
                View All Orders & Manage Status
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/admin/products', icon: Package, color: 'purple', title: 'Manage Products', desc: 'Add, edit, remove products' },
            { href: '/admin/orders', icon: ShoppingCart, color: 'green', title: 'Manage Orders', desc: 'Update status, track shipments' },
            { href: '/admin/customers', icon: BarChart3, color: 'blue', title: 'Customers', desc: 'View customer information' },
            { href: '/admin/analytics', icon: DollarSign, color: 'orange', title: 'Analytics', desc: 'Sales reports & Gantt charts' },
          ].map(({ href, icon: Icon, color, title, desc }) => (
            <Link key={href} href={href}
              className={`block bg-white rounded-xl border border-gray-200 p-5 hover:border-${color}-300 hover:shadow-lg transition-all group`}>
              <Icon className={`w-6 h-6 text-${color}-600 mb-2 group-hover:scale-110 transition-transform`} />
              <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-xs text-gray-500">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}