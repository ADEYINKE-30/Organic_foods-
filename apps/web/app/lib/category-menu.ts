export interface MegaMenuItem {
  name: string;
  slug: string;
  icon: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

/** Structured mega-menu — no duplicate labels */
export const categoryMegaMenu: MegaMenuColumn[] = [
  {
    title: 'Fresh Produce',
    items: [
      { name: 'Fruits', slug: 'fruits-vegetables', icon: 'fruits' },
      { name: 'Vegetables', slug: 'fruits-vegetables', icon: 'organic' },
      { name: 'Herbs & Greens', slug: 'herbs-greens', icon: 'fresh' },
    ],
  },
  {
    title: 'Bakery',
    items: [
      { name: 'Breads', slug: 'breads', icon: 'bakery' },
      { name: 'Sweets', slug: 'sweets-pastries', icon: 'bakery' },
      { name: 'Cakes & Pastries', slug: 'sweets-pastries', icon: 'bakery' },
    ],
  },
  {
    title: 'Pantry',
    items: [
      { name: 'Rice & Grains', slug: 'pantry', icon: 'pasta' },
      { name: 'Oil & Spices', slug: 'pantry', icon: 'spices' },
      { name: 'Beverages', slug: 'beverages', icon: 'beverages' },
      { name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: 'dairy' },
    ],
  },
];
