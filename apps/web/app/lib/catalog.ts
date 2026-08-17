import type { Product, Category, BlogPost, OrderSummary } from '~/lib/mock-data';
import {
  blogPosts,
  categories,
  getAllProducts,
  getBlogPostBySlug,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  mockOrders,
} from '~/lib/mock-data';
import { apiClient, getApiErrorMessage } from '~/lib/api-client';
import { useLiveApi } from '~/lib/env';

export type { Product, Category, BlogPost, OrderSummary };

export interface ProductListParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

function filterProducts(products: Product[], params?: ProductListParams): Product[] {
  const search = params?.search?.trim().toLowerCase() ?? '';
  const category = params?.category ?? 'all';

  return products.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || product.categorySlug === category;
    return matchesSearch && matchesCategory;
  });
}

async function tryApi<T>(request: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  if (!useLiveApi()) return fallback();
  try {
    return await request();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[catalog] API fallback:', getApiErrorMessage(error));
    }
    return fallback();
  }
}

export async function fetchCategories(): Promise<Category[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Category[]>('/categories');
      return data;
    },
    () => categories,
  );
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Category>(`/categories/${slug}`);
      return data;
    },
    () => getCategoryBySlug(slug) ?? null,
  );
}

export async function fetchProducts(params?: ProductListParams): Promise<Product[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Product[]>('/products', { params });
      return data;
    },
    () => filterProducts(getAllProducts(), params),
  );
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Product>(`/products/${slug}`);
      return data;
    },
    () => getProductBySlug(slug) ?? null,
  );
}

export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Product[]>(`/categories/${slug}/products`);
      return data;
    },
    () => getProductsByCategory(slug),
  );
}

export async function fetchRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<Product[]>(`/products/${product.slug}/related`, {
        params: { limit },
      });
      return data;
    },
    () => getRelatedProducts(product, limit),
  );
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<BlogPost[]>('/blog');
      return data;
    },
    () => blogPosts,
  );
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<BlogPost>(`/blog/${slug}`);
      return data;
    },
    () => getBlogPostBySlug(slug) ?? null,
  );
}

export async function fetchOrders(): Promise<OrderSummary[]> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<OrderSummary[]>('/orders');
      return data;
    },
    () => mockOrders,
  );
}

export async function fetchOrder(id: string): Promise<OrderSummary | null> {
  return tryApi(
    async () => {
      const { data } = await apiClient.get<OrderSummary>(`/orders/${id}`);
      return data;
    },
    () => mockOrders.find((order) => order.id === id) ?? null,
  );
}

export async function fetchHomeCatalog() {
  const [allCategories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  return {
    categories: allCategories,
    bestSellers: products.slice(0, 10),
    featured: products.slice(0, 9),
    popular: products.slice(3, 12),
    latest: products.slice(5, 14),
    blogPosts: await fetchBlogPosts(),
  };
}
