'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Manager {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) { router.push('/login'); return; }
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') { router.push('/dashboard'); return; }
    fetchManagers();
  }, [router]);

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users?role=manager', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const managersOnly = data.filter((u: Manager) => u.role === 'manager');
        setManagers(managersOnly);
      }
    } catch (error) {
      console.error('Failed to fetch managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          role: 'manager',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create manager');
        return;
      }

      setSuccess(`Manager ${formData.firstName} ${formData.lastName} created successfully!`);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setShowForm(false);
      fetchManagers();
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteManager = async (managerId: string) => {
    if (!confirm('Are you sure you want to delete this manager?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${managerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setManagers(managers.filter(m => m._id !== managerId));
      }
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Managers</h1>
            <p className="text-sm text-gray-500 mt-1">Create and manage store managers</p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            {showForm ? 'Cancel' : '+ Add Manager'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            ❌ {error}
          </div>
        )}

        {/* Create Manager Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Create New Manager</h2>
            <form onSubmit={handleCreateManager} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="manager@lensify.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min 6 characters"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {saving ? 'Creating Manager...' : 'Create Manager'}
              </button>
            </form>
          </div>
        )}

        {/* Managers List */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
          </div>
        ) : managers.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {managers.map((manager) => (
                  <tr key={manager._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {manager.firstName} {manager.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{manager.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full capitalize">
                        {manager.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(manager.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteManager(manager._id)}
                        className="text-xs px-3 py-1 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <p className="text-4xl mb-4">👤</p>
            <p className="text-xl font-bold text-gray-900 mb-2">No managers yet</p>
            <p className="text-gray-500 text-sm">Click "Add Manager" to create your first manager account</p>
          </div>
        )}
      </div>
    </main>
  );
}