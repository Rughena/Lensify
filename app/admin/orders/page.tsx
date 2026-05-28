'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber?: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { name?: string; quantity?: number; price?: number }[];
  shippingAddress?: string;
  userId?: any;
}

const STATUS_FLOW = [
  { value: 'processing',    label: 'Processing',    color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-blue-100 text-blue-800',     dot: 'bg-blue-500'   },
  { value: 'shipped',       label: 'Shipped',       color: 'bg-indigo-100 text-indigo-800', dot: 'bg-indigo-500' },
  { value: 'delivered',     label: 'Delivered',     color: 'bg-green-100 text-green-800',   dot: 'bg-green-500'  },
  { value: 'cancelled',     label: 'Cancelled',     color: 'bg-red-100 text-red-800',       dot: 'bg-red-500'    },
];

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_FLOW.find(f => f.value === status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s?.color ?? 'bg-gray-100 text-gray-700'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s?.dot ?? 'bg-gray-400'}`} />
      {s?.label ?? status}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) { router.push('/login'); return; }
    const userData = JSON.parse(user);
    if (!['admin', 'manager'].includes(userData.role)) { router.push('/dashboard'); return; }
    setIsAdmin(userData.role === 'admin');
    fetchOrders(token);
  }, [router]);

  const fetchOrders = async (token: string) => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders(prev =>
          prev.map(o => o._id === orderId ? { ...o, status: updated.status } : o)
        );
        setSuccessMsg('Order status updated successfully');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to update status: ${err.error}`);
      }
    } catch (e) {
      console.error('Network error:', e);
      alert('Network error — could not update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/admin/customers" className="text-gray-600 hover:text-gray-900">Customers</Link>
            <Link href="/admin/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Success message */}
        {successMsg && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            ✅ {successMsg}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500 mt-1">
              {orders.length} total order{orders.length !== 1 ? 's' : ''} from all customers
            </p>
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filter:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 bg-white"
            >
              <option value="all">All Orders</option>
              {STATUS_FLOW.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status summary pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {STATUS_FLOW.map(s => {
            const count = orders.filter(o => o.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setFilterStatus(filterStatus === s.value ? 'all' : s.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                  filterStatus === s.value
                    ? s.color + ' border-transparent'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {s.label}: {count}
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-white animate-pulse rounded-xl border border-gray-200" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-600 text-sm font-medium">No orders found</p>
            <p className="text-gray-400 text-xs mt-1">
              {filterStatus !== 'all'
                ? 'Try selecting a different status filter'
                : 'Orders will appear here once customers place them'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition">

                {/* Order header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                    <p className="font-mono font-semibold text-gray-900 text-sm">
                      #{order.orderNumber ?? order._id.slice(-10).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Placed on</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Items ordered</p>
                  <div className="space-y-1">
                    {order.items?.length > 0 ? (
                      order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.name ?? `Product ${i + 1}`}
                            {item.quantity && item.quantity > 1 && (
                              <span className="text-gray-400 ml-1">×{item.quantity}</span>
                            )}
                          </span>
                          <span className="text-gray-600 font-medium">
                            Rs {((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No item details</p>
                    )}
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-sm font-bold text-purple-700">
                      Rs {order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Shipping address */}
                {order.shippingAddress && (
                  <p className="text-xs text-gray-500 mb-4">
                    📍 {order.shippingAddress}
                  </p>
                )}

                {/* Status + update controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Status:</span>
                    <StatusBadge status={order.status} />
                  </div>

                  {isAdmin ? (
                    // Admin: full status dropdown
                    <div className="relative flex items-center gap-2">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={e => updateStatus(order._id, e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 bg-white disabled:opacity-50 cursor-pointer"
                      >
                        {STATUS_FLOW.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      {updatingId === order._id && (
                        <span className="text-xs text-gray-400 ml-1">Saving...</span>
                      )}
                    </div>
                  ) : (
                    // Manager: dispatch button only
                    ['processing', 'ready_to_ship'].includes(order.status) ? (
                      <button
                        onClick={() => updateStatus(order._id, 'shipped')}
                        disabled={updatingId === order._id}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50"
                      >
                        {updatingId === order._id ? 'Dispatching...' : '🚚 Dispatch'}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No action needed</span>
                    )
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}