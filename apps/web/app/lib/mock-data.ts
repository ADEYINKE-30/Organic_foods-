export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  comparePrice: number;
  rating: number;
  reviewCount: number;
  discount?: string;
  categorySlug: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function product(
  id: number,
  name: string,
  imageNum: number,
  price: number,
  comparePrice: number,
  reviewCount: number,
  discount = '10% OFF',
): Product {
  const categorySlug = categories[id % categories.length]?.slug ?? 'fruits-vegetables';
  return {
    id: String(id),
    name,
    slug: slugify(name),
    image: `/images/product-thumb-${imageNum}.png`,
    price,
    comparePrice,
    rating: 4.5,
    reviewCount,
    discount,
    categorySlug,
  };
}

export const categories: Category[] = [
  { slug: 'fruits-vegetables', name: 'Fruits & Vegetables', image: '/images/category-thumb-1.jpg' },
  { slug: 'herbs-greens', name: 'Herbs & Greens', image: '/images/category-thumb-3.jpg' },
  { slug: 'breads', name: 'Breads', image: '/images/category-thumb-6.jpg' },
  { slug: 'sweets-pastries', name: 'Sweets & Pastries', image: '/images/category-thumb-2.jpg' },
  { slug: 'pantry', name: 'Rice, Oil & Spices', image: '/images/category-thumb-8.jpg' },
  { slug: 'beverages', name: 'Beverages', image: '/images/category-thumb-4.jpg' },
  { slug: 'meat-products', name: 'Meat & Poultry', image: '/images/category-thumb-5.jpg' },
  { slug: 'dairy-eggs', name: 'Dairy & Eggs', image: '/images/category-thumb-7.jpg' },
];

export const bestSellerProducts: Product[] = [
  product(1, 'Whole Wheat Sandwich Bread', 1, 18, 24, 222),
  product(2, 'Whole Grain Oatmeal', 2, 50, 54, 41),
  product(3, 'Sharp Cheddar Cheese Block', 3, 12, 14, 32),
  product(4, 'Organic Baby Spinach', 4, 18, 24, 222),
  product(5, 'Organic Spinach Leaves (Fresh Produce)', 5, 18, 24, 222),
  product(6, 'Fresh Salmon', 6, 18, 24, 222),
  product(7, 'Imported Italian Spaghetti Pasta', 7, 18, 24, 222),
  product(8, 'Granny Smith Apples', 8, 18, 24, 222),
  product(9, 'Organic 2% Reduced Fat Milk', 9, 18, 24, 222),
  product(10, 'Greek Style Plain Yogurt', 10, 18, 24, 222),
];

export const featuredProducts: Product[] = [
  product(10, 'Greek Style Plain Yogurt', 10, 18, 24, 222),
  product(11, 'Pure Squeezed No Pulp Orange Juice', 11, 18, 24, 222),
  product(12, 'Fresh Oranges', 12, 18, 24, 222),
  product(13, 'Gourmet Dark Chocolate Bars', 13, 18, 24, 222),
  product(14, 'Fresh Green Celery', 14, 18, 24, 222),
  product(15, 'Sandwich Bread', 15, 18, 24, 222),
  product(16, 'Honeycrisp Apples', 16, 18, 24, 222),
  product(17, 'Whole Wheat Sandwich Bread', 17, 18, 24, 222),
  product(18, 'Honeycrisp Apples', 18, 18, 24, 222),
];

export const popularProducts: Product[] = [
  product(15, 'Sandwich Bread', 15, 18, 24, 222),
  product(16, 'Honeycrisp Apples', 16, 18, 24, 222),
  product(17, 'Whole Wheat Sandwich Bread', 17, 18, 24, 222),
  product(18, 'Honeycrisp Apples', 18, 18, 24, 222),
  product(19, 'Sunstar Fresh Melon Juice', 19, 18, 24, 222),
  product(10, 'Greek Style Plain Yogurt', 10, 18, 24, 222),
  product(11, 'Pure Squeezed No Pulp Orange Juice', 11, 18, 24, 222),
  product(12, 'Fresh Oranges', 12, 18, 24, 222),
  product(13, 'Gourmet Dark Chocolate Bars', 13, 18, 24, 222),
];

export const latestProducts: Product[] = [
  product(20, 'Sunstar Fresh Melon Juice', 20, 18, 24, 222),
  product(1, 'Whole Wheat Sandwich Bread', 1, 18, 24, 222),
  product(21, 'Sunstar Fresh Melon Juice', 21, 18, 24, 222),
  product(22, 'Gourmet Dark Chocolate', 22, 18, 24, 222),
  product(23, 'Sunstar Fresh Melon Juice', 23, 18, 24, 222),
  product(10, 'Greek Style Plain Yogurt', 10, 18, 24, 222),
  product(11, 'Pure Squeezed No Pulp Orange Juice', 11, 18, 24, 222),
  product(12, 'Fresh Oranges', 12, 18, 24, 222),
  product(13, 'Gourmet Dark Chocolate Bars', 13, 18, 24, 222),
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-casual-look-ideas-to-dress-up-your-kids',
    title: 'Top 10 casual look ideas to dress up your kids',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...',
    image: '/images/post-thumbnail-1.jpg',
    date: '22 Aug 2021',
    category: 'tips & tricks',
  },
  {
    id: '2',
    slug: 'latest-trends-of-wearing-street-wears-supremely',
    title: 'Latest trends of wearing street wears supremely',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...',
    image: '/images/post-thumbnail-2.jpg',
    date: '25 Aug 2021',
    category: 'trending',
  },
  {
    id: '3',
    slug: '10-different-types-of-comfortable-clothes-ideas-for-women',
    title: '10 Different Types of comfortable clothes ideas for women',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...',
    image: '/images/post-thumbnail-3.jpg',
    date: '28 Aug 2021',
    category: 'inspiration',
  },
];

export const cartItems = [
  { id: '1', name: 'Growers cider', description: 'Brief description', price: 12 },
  { id: '2', name: 'Fresh grapes', description: 'Brief description', price: 8 },
  { id: '3', name: 'Heinz tomato ketchup', description: 'Brief description', price: 5 },
];

export const peopleLookingTerms = [
  'Blue diamon almonds',
  "Angie's Boomchickapop Corn",
  'Salty kettle Corn',
  'Chobani Greek Yogurt',
  'Sweet Vanilla Yogurt',
  'Foster Farms Takeout Crispy wings',
  'Warrior Blend Organic',
  'Chao Cheese Creamy',
  'Chicken meatballs',
];

const allProductsList: Product[] = [
  ...bestSellerProducts,
  ...featuredProducts,
  ...popularProducts,
  ...latestProducts,
];

export function getAllProducts(): Product[] {
  const seen = new Set<string>();
  return allProductsList.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((item) => item.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((item) => item.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((item) => item.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((item) => item.categorySlug === categorySlug);
}

export interface OrderSummary {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

export const mockOrders: OrderSummary[] = [
  { id: 'ORD-1001', date: 'Jul 1, 2026', status: 'delivered', total: 86.5, items: 4 },
  { id: 'ORD-1002', date: 'Jul 4, 2026', status: 'shipped', total: 42.0, items: 2 },
  { id: 'ORD-1003', date: 'Jul 7, 2026', status: 'processing', total: 118.25, items: 6 },
];
