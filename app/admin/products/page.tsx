'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Pencil, X } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  shape: string;
  color: string;
  imageUrl?: string;
}

// Safe delete confirmation modal
function DeleteModal({
  product,
  onConfirm,
  onCancel,
  deleting,
}: {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">Delete product?</h2>
        <p className="text-sm text-gray-500 mb-4">
          This will permanently remove{' '}
          <span className="font-semibold text-gray-800">"{product.name}"</span>{' '}
          from your store. This action cannot be undone.
        </p>

        {/* Product preview */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-6">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-14 h-10 object-contain rounded-lg bg-white border border-gray-100"
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-500">{product.brand} · Rs {product.price.toLocaleString()} · {product.stock} in stock</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Yes, delete it'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/login'); return; }
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') { router.push('/dashboard'); return; }
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products ?? data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/products/${productToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
        setSuccessMsg(`"${productToDelete.name}" was deleted successfully.`);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Error deleting product.');
    } finally {
      setDeleting(false);
      setProductToDelete(null);
    }
  };

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Delete confirmation modal */}
      {productToDelete && (
        <DeleteModal
          product={productToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setProductToDelete(null)}
          deleting={deleting}
        />
      )}

      <main className="min-h-screen bg-white">
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
              <Link href="/admin/customers" className="text-gray-600 hover:text-gray-900">Customers</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
            <Link href="/admin/products/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 text-sm rounded-lg">
                + Add Product
              </Button>
            </Link>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
              ✅ {successMsg}
            </div>
          )}

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products by name or brand..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">No products found</p>
              <Link href="/admin/products/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Create First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Product</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Brand</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Price</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Stock</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Category</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-900 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {product.imageUrl && (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-12 h-9 object-contain rounded-lg bg-gray-50 border border-gray-100"
                              />
                            )}
                            <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-sm">{product.brand}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900 text-sm">
                          Rs {product.price.toLocaleString()}
                          {product.discount > 0 && (
                            <span className="ml-2 text-xs text-green-600 font-normal">-{product.discount}%</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock > 10
                              ? 'bg-green-100 text-green-800'
                              : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600 capitalize text-sm">{product.category}</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            {/* ✅ Fixed: links to /admin/products/[id] not /edit */}
                            <Link href={`/admin/products/${product._id}`}>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-lg transition">
                                <Pencil className="w-3 h-3" />
                                Edit
                              </button>
                            </Link>
                            {/* ✅ Safe: opens modal instead of deleting immediately */}
                            <button
                              onClick={() => setProductToDelete(product)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}{searchTerm ? ' found' : ' total'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}