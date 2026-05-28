'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, Settings, LogOut, Plus } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // Fetch admin stats
    const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const [ordersRes, productsRes, usersRes] = await Promise.all([
      fetch('/api/orders', { headers }),
      fetch('/api/products'),
      fetch('/api/users', { headers }),
    ]);

    const orders = ordersRes.ok ? await ordersRes.json() : [];
    const productsData = productsRes.ok ? await productsRes.json() : [];
    const products = productsData.products ?? productsData;
    const users = usersRes.ok ? await usersRes.json() : [];
    const customers = users.filter((u: any) => u.role === 'customer');

    setStats({
      totalOrders: orders.length,
      totalRevenue: orders.reduce((s: number, o: any) => s + o.totalAmount, 0),
      totalCustomers: customers.length,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  const adminSections = [
    {
      title: 'Dashboard',
      description: 'View overall analytics and performance metrics',
      icon: BarChart3,
      href: '/admin/dashboard',
      color: 'from-blue-500 to-blue-600',
    },
    {
  title: 'Managers',
  description: 'Create and manage staff manager accounts',
  icon: Users,
  href: '/admin/managers',
  color: 'from-blue-500 to-blue-600',
},
    {
      title: 'Products',
      description: 'Manage inventory and product listings',
      icon: Package,
      href: '/admin/products',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Orders',
      description: 'Track and manage customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Customers',
      description: 'View and manage customer information',
      icon: Users,
      href: '/admin/customers',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Analytics',
      description: 'Detailed sales and traffic analytics',
      icon: TrendingUp,
      href: '/admin/analytics',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lensify Admin</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Back to Store
            </Link>
            // In app/admin/dashboard/page.tsx nav links, add:
<Link href="/admin/managers" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
  Managers
</Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Rs {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
              </div>
              <Package className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Admin Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href}>
                  <div className="group h-full bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-300 transition-all cursor-pointer">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm">
                      Go to {section.title}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/products/new">
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105">
                <Plus className="w-4 h-4 inline mr-2" />
                Add New Product
              </button>
            </Link>
            <Link href="/admin/customers">
              <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105">
                <Users className="w-4 h-4 inline mr-2" />
                View All Customers
              </button>
            </Link>
            <Link href="/admin/analytics">
              <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                View Analytics
              </button>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need help? <a href="/contact-us" className="text-blue-600 hover:text-blue-700 font-semibold">Contact support</a>
          </p>
        </div>
      </div>
    </main>
  );
}
