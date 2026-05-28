'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/footer';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || '',
      country: userData.country || '',
      zipCode: userData.zipCode || '',
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Update user in localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
      setMessage('Profile updated successfully!');

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Loading...</div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-50 border border-gray-200 p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">
                  {user.firstName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{user.email}</p>
              <p className="text-xs text-gray-500 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded mb-4">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>

              <Button
                onClick={() => setEditing(!editing)}
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gray-50 border border-gray-200 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/orders">
                  <div className="text-gray-700 hover:text-gray-900 cursor-pointer py-2 font-medium">
                    My Orders
                  </div>
                </Link>
                <Link href="/shop">
                  <div className="text-gray-700 hover:text-gray-900 cursor-pointer py-2 font-medium">
                    Shop
                  </div>
                </Link>
                <Link href="/try-on">
                  <div className="text-gray-700 hover:text-gray-900 cursor-pointer py-2 font-medium">
                    Virtual Try-On
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            {message && (
              <Card
                className={`p-4 mb-6 border ${
                  message.includes('success')
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <p
                  className={`text-sm ${
                    message.includes('success')
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {message}
                </p>
              </Card>
            )}

            <Card className="bg-gray-50 border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded text-gray-600 opacity-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter street address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>

                {editing && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 mt-8"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
