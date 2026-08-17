import { Link } from 'react-router';
import { Icon } from '~/components/icons/Icon';
import { blogPosts } from '~/lib/mock-data';

export function BlogSection() {
  return (
    <section id="latest-blog" className="pb-4">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="my-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title text-2xl font-medium text-gray-900">Our Recent Blog</h2>
          <Link
            to="/blog"
            className="rounded bg-[#6BB252] px-4 py-2 text-sm font-medium text-white hover:bg-[#5da347]"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="post-item rounded border-0 bg-white p-3 shadow-sm">
              <div className="image-holder zoom-effect overflow-hidden rounded">
                <Link to={`/blog/${post.slug}`}>
                  <img src={post.image} alt={post.title} className="w-full rounded object-cover" />
                </Link>
              </div>
              <div className="mt-3">
                <div className="post-meta my-2 flex flex-wrap items-center gap-3 text-xs uppercase text-gray-600">
                  <div className="meta-date flex items-center gap-1">
                    <Icon id="calendar" width={16} height={16} />
                    {post.date}
                  </div>
                  <div className="meta-categories flex items-center gap-1">
                    <Icon id="category" width={16} height={16} />
                    {post.category}
                  </div>
                </div>
                <div className="post-header">
                  <h3 className="post-title text-lg font-medium">
                    <Link to={`/blog/${post.slug}`} className="text-gray-900 no-underline hover:text-[#6BB252]">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
