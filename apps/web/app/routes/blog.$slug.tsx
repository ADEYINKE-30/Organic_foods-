import { Link } from 'react-router';
import type { Route } from './+types/blog.$slug';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';
import { fetchBlogPost } from '~/lib/catalog';

export async function loader({ params }: Route.LoaderArgs) {
  const post = await fetchBlogPost(params.slug);
  return { post };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const post = loaderData?.post;
  return [{ title: post ? `${post.title} — FreshMart` : 'Blog — FreshMart' }];
}

export default function BlogPostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  if (!post) {
    return (
      <section className="page-section">
        <div className="container-lg text-center">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <Link to="/blog" className="btn-primary mt-6 inline-flex">
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="page-section">
      <div className="container-lg mx-auto max-w-3xl">
        <PageHeader
          title={post.title}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.title },
          ]}
        />
        <img src={post.image} alt={post.title} className="card mb-8 h-72 w-full object-cover md:h-96" />
        <div className="mb-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wide text-gray-500">
          <span className="flex items-center gap-1">
            <Icon id="calendar" width={14} height={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Icon id="category" width={14} height={14} />
            {post.category}
          </span>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </article>
  );
}
