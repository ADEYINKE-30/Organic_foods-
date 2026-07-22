import { FormEvent } from 'react';
import type { Route } from './+types/contact';
import { Icon } from '~/components/icons/Icon';
import { PageHeader } from '~/components/ui/PageHeader';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Contact — FreshMart' }];
}

export default function ContactPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('Thank you! We will get back to you soon.');
    event.currentTarget.reset();
  }

  return (
    <section className="page-section">
      <div className="container-lg">
        <PageHeader
          title="Contact Us"
          description="We're here to help with orders, products, and delivery."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: 'link', title: 'Email', value: 'support@freshmart.com' },
              { icon: 'delivery', title: 'Phone', value: '+1 (555) 123-4567' },
              { icon: 'calendar', title: 'Hours', value: 'Mon–Sat, 8am–8pm' },
            ].map((item) => (
              <div key={item.title} className="card flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon id={item.icon} width={20} height={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="card space-y-4 p-6">
            <div>
              <label className="form-label" htmlFor="name">Your name</label>
              <input id="name" required className="form-input" />
            </div>
            <div>
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" required className="form-input" />
            </div>
            <div>
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" required rows={5} className="form-input resize-y" />
            </div>
            <button type="submit" className="btn-primary-lg w-full">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
