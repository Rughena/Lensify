'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Manager only sees analytics + orders (read + dispatch only)
// Reuse your analytics and orders pages — they already check for 'manager' role now
export default function ManagerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/login'); return; }
    const userData = JSON.parse(user);
    if (userData.role !== 'manager') { router.push('/'); return; }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-purple-700">Lensify Manager</span>
          <div className="flex gap-6 text-sm">
            <Link href="/admin/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
            <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
            <button
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Manager Dashboard</h1>
        <p className="text-gray-500 mb-10">You have access to analytics and order dispatching only.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/analytics"
            className="bg-white rounded-xl border border-gray-200 p-8 hover:border-purple-300 hover:shadow-lg transition-all group">
            <p className="text-3xl mb-3">📊</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700">Analytics & Reports</h3>
            <p className="text-sm text-gray-500">View revenue, order trends, and product performance</p>
          </Link>

          <Link href="/admin/orders"
            className="bg-white rounded-xl border border-gray-200 p-8 hover:border-purple-300 hover:shadow-lg transition-all group">
            <p className="text-3xl mb-3">📦</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700">Orders & Dispatch</h3>
            <p className="text-sm text-gray-500">View all orders and dispatch items for shipping</p>
          </Link>
        </div>
      </div>
    </main>
  );
}