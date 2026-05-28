'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'];

const STATUS_COLORS: Record<string, string> = {
  pending:    '#378ADD',
  processing: '#EF9F27',
  shipped:    '#7F77DD',
  delivered:  '#1D9E75',
  cancelled:  '#E24B4A',
};

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

// Custom Gantt bar shape for Recharts
const GanttBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  if (!width || width <= 0) return null;
  return <rect x={x} y={y + 4} width={width} height={Math.max(height - 8, 8)} fill={fill} rx={4} />;
};

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) { router.push('/login'); return; }
    const userData = JSON.parse(user);
    if (!['admin', 'manager'].includes(userData.role)) {
      router.push('/dashboard');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch('/api/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        fetch('/api/products'),
      ]);
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products ?? data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived stats ──────────────────────────────────────────────
  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;
  const totalInventoryValue = products.reduce((s, p) => s + p.price * (p.stock || 0), 0);

  // ── Monthly revenue & orders ───────────────────────────────────
  const monthMap: Record<string, { month: string; revenue: number; orders: number }> = {};
  orders.forEach(o => {
    const month = new Date(o.createdAt).toLocaleString('en', { month: 'short', year: '2-digit' });
    if (!monthMap[month]) monthMap[month] = { month, revenue: 0, orders: 0 };
    monthMap[month].revenue += o.totalAmount;
    monthMap[month].orders += 1;
  });
  const monthlyData = Object.values(monthMap);

  // ── Orders by status (for pie) ─────────────────────────────────
  const statusCounts: Record<string, number> = {};
  orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // ── Top products by items sold ─────────────────────────────────
  const productSales: Record<string, { name: string; sold: number }> = {};
  orders.forEach(o => {
    o.items?.forEach((item: any) => {
      const key = item.productId ?? item.name;
      if (!productSales[key]) productSales[key] = { name: item.name ?? key, sold: 0 };
      productSales[key].sold += item.quantity ?? 1;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.sold - a.sold).slice(0, 6);

  // ── Gantt chart data ───────────────────────────────────────────
  // Each order gets a bar: start = order date, width = days in current status
  const STATUS_DAYS: Record<string, number> = {
    pending: 2, processing: 4, shipped: 6, delivered: 9, cancelled: 1,
  };

  // Find the earliest order date to use as timeline origin
  const sortedOrders = [...orders]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(0, 12); // show max 12 orders

  const timelineStart = sortedOrders.length
    ? new Date(sortedOrders[0].createdAt).getTime()
    : Date.now();

  const ganttData = sortedOrders.map(order => {
    const startMs = new Date(order.createdAt).getTime();
    const startDay = Math.round((startMs - timelineStart) / (1000 * 60 * 60 * 24));
    const duration = STATUS_DAYS[order.status] ?? 3;
    return {
      name: `#${order._id.slice(-6).toUpperCase()}`,
      // "gap" is invisible — pushes bar to correct start position
      gap: startDay,
      duration,
      status: order.status,
      amount: order.totalAmount,
      date: new Date(order.createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' }),
    };
  });

  // Custom tooltip for Gantt
  const GanttTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]?.payload;
    if (!d) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold text-gray-900 mb-1">{d.name}</p>
        <p className="text-gray-500">Date: {d.date}</p>
        <p className="text-gray-500">
          Status: <span className="font-medium" style={{ color: STATUS_COLORS[d.status] }}>
            {d.status}
          </span>
        </p>
        <p className="text-gray-500">Est. days: {d.duration}</p>
        <p className="text-gray-500">Amount: Rs {d.amount?.toLocaleString()}</p>
      </div>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-600 border-t-transparent" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
            <Link href="/admin/customers" className="text-gray-600 hover:text-gray-900">Customers</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Analytics & Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Live data from your store</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `Rs ${totalRevenue.toLocaleString()}`, sub: 'All orders combined', color: 'text-purple-700' },
            { label: 'Total Orders', value: orders.length, sub: `${deliveredOrders.length} delivered`, color: 'text-green-700' },
            { label: 'Avg Order Value', value: `Rs ${avgOrderValue.toFixed(0)}`, sub: 'Per transaction', color: 'text-blue-700' },
            { label: 'Inventory Value', value: `Rs ${totalInventoryValue.toLocaleString()}`, sub: 'Total stock value', color: 'text-orange-700' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Line Chart — Monthly Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          {monthlyData.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No order data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [`Rs ${v.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart — Orders per Month */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders per Month</h2>
            {monthlyData.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Pie Chart — Orders by Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h2>
            {pieData.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Horizontal Bar — Top Selling Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No sales data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={160} />
                <Tooltip />
                <Bar dataKey="sold" fill="#a78bfa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ── GANTT CHART ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Order Timeline (Gantt)</h2>
          <p className="text-xs text-gray-400 mb-4">
            Each bar shows an order's position in the timeline. Width = estimated days in current status.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-5">
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <span key={status} className="flex items-center gap-1.5 text-xs text-gray-500 capitalize">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: color }} />
                {status}
              </span>
            ))}
          </div>

          {ganttData.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No order data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(260, ganttData.length * 40 + 60)}>
              <BarChart
                data={ganttData}
                layout="vertical"
                margin={{ top: 4, right: 20, left: 80, bottom: 4 }}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Days from first order', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#9ca3af' }}
                  height={36}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  width={72}
                />
                <Tooltip content={<GanttTooltip />} />

                {/* Invisible gap bar — pushes the visible bar to the right */}
                <Bar dataKey="gap" stackId="gantt" fill="transparent" />

                {/* Visible duration bar — colored by status */}
                <Bar
                  dataKey="duration"
                  stackId="gantt"
                  shape={(props: any) => {
                    const status = props?.name
                      ? ganttData.find(d => d.name === props.name)?.status ?? 'pending'
                      : 'pending';
                    return <GanttBar {...props} fill={STATUS_COLORS[status] ?? '#7c3aed'} />;
                  }}
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Order Status Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Breakdown</h2>
            <div className="space-y-4">
              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => {
                const count = orders.filter(o => o.status === status).length;
                const pct = orders.length ? (count / orders.length) * 100 : 0;
                const colors: Record<string, string> = {
                  delivered: 'bg-green-500', shipped: 'bg-blue-500',
                  processing: 'bg-yellow-500', cancelled: 'bg-red-500', pending: 'bg-gray-400',
                };
                return (
                  <div key={status}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize text-gray-700">{status}</span>
                      <span className="text-xs text-gray-500">{count} orders</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              {[
                { label: 'Pending Orders', value: pendingOrders.length, color: 'text-yellow-600' },
                { label: 'Delivered Orders', value: deliveredOrders.length, color: 'text-green-600' },
                { label: 'Total Products', value: products.length, color: 'text-blue-600' },
                { label: 'Conversion Rate', value: `${orders.length ? ((deliveredOrders.length / orders.length) * 100).toFixed(1) : 0}%`, color: 'text-purple-600' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{stat.label}</span>
                  <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order, i) => (
                  <tr key={order._id ?? i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">#{order._id?.slice(-8).toUpperCase()}</td>
                    <td className="py-3 px-4 font-semibold text-green-700">Rs {order.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{order.status}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}