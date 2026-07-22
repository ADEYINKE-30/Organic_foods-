import { Link } from 'react-router';
import type { Route } from './+types/blog._index';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';
import { fetchBlogPosts } from '~/lib/catalog';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Blog — FreshMart' }];
}

export async function loader() {
  const posts = await fetchBlogPosts();
  return { posts };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Our Blog"
          description="Tips, recipes, and inspiration for healthy living."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="card group overflow-hidden">
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-5">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icon id="calendar" width={14} height={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon id="category" width={14} height={14} />
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-semibold leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
