import { FormEvent, useMemo, useState } from 'react';
import type { Route } from './+types/products._index';
import { useAdminStore } from '~/store/admin.store';
import type { AdminProduct } from '~/lib/admin-data';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Products — FreshMart Admin' }];
}

export default function AdminProductsPage() {
  const products = useAdminStore((s) => s.products);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProducts = useAdminStore((s) => s.deleteProducts);
  const addProduct = useAdminStore((s) => s.addProduct);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categorySlug.includes(q),
    );
  }, [products, search]);

  function toggleAll() {
    setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));
  }

  function handleQuickSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const form = new FormData(event.currentTarget);
    updateProduct(editing.id, {
      price: Number(form.get('price')),
      stock: Number(form.get('stock')),
      status: form.get('status') === 'active' ? 'active' : 'inactive',
    });
    setEditing(null);
  }

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addProduct({
      id: `new-${Date.now()}`,
      name,
      slug,
      image: '/images/product-thumb-1.png',
      price: Number(form.get('price')),
      comparePrice: Number(form.get('comparePrice') || form.get('price')),
      rating: 4.5,
      reviewCount: 0,
      categorySlug: String(form.get('category') ?? 'fruits-vegetables'),
      sku: `FM-${Date.now().toString().slice(-4)}`,
      stock: Number(form.get('stock')),
      status: 'active',
      isOrganic: true,
      isVegan: false,
      isGlutenFree: false,
      brand: 'FreshMart',
      weight: '1kg',
    });
    setShowAdd(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in catalog</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          + Add product
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, SKU, category..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 sm:max-w-sm"
        />
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => {
              deleteProducts(selected);
              setSelected([]);
            }}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
          >
            Delete selected ({selected.length})
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
                </th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50/80">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={(e) =>
                        setSelected((prev) =>
                          e.target.checked ? [...prev, product.id] : prev.filter((id) => id !== product.id),
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-contain" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{product.sku}</td>
                  <td className="px-4 py-3 capitalize">{product.categorySlug.replace(/-/g, ' ')}</td>
                  <td className="px-4 py-3 font-semibold">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock === 0 ? 'text-red-600' : product.stock <= 8 ? 'text-amber-600' : 'text-gray-700'}>
                      {product.stock === 0 ? 'Out of stock' : product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEditing(product)}
                      className="text-sm font-medium text-emerald-600 hover:underline"
                    >
                      Quick edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleQuickSave} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Quick edit — {editing.name}</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Price</label>
                <input name="price" type="number" step="0.01" defaultValue={editing.price} className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Stock</label>
                <input name="stock" type="number" defaultValue={editing.stock} className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select name="status" defaultValue={editing.status} className="w-full rounded-lg border px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleAdd} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Add product</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input name="name" required className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Price</label>
                <input name="price" type="number" step="0.01" required className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Compare price</label>
                <input name="comparePrice" type="number" step="0.01" className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Stock</label>
                <input name="stock" type="number" required defaultValue={10} className="w-full rounded-lg border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Category</label>
                <select name="category" className="w-full rounded-lg border px-3 py-2">
                  <option value="fruits-vegetables">Fruits & Vegetables</option>
                  <option value="breads">Breads</option>
                  <option value="dairy-eggs">Dairy & Eggs</option>
                  <option value="beverages">Beverages</option>
                  <option value="meat-products">Meat & Poultry</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setShowAdd(false)} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
