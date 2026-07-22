import { Outlet } from 'react-router';
import type { Route } from './+types/_storefront';
import { MainLayout } from '~/components/layout/MainLayout';
import { fetchCategories } from '~/lib/catalog';

export async function loader() {
  const categories = await fetchCategories();
  return { categories };
}

export default function StorefrontLayout({ loaderData }: Route.ComponentProps) {
  return <MainLayout categories={loaderData.categories}><Outlet /></MainLayout>;
}
