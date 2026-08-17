export function NewsletterSection() {
  return (
    <section>
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div
          className="my-5 bg-[#364127] bg-cover bg-center py-5 text-white"
          style={{ backgroundImage: "url('/images/banner-newsletter.jpg')" }}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2">
              <div className="p-3">
                <div className="section-header">
                  <h2 className="section-title text-4xl font-medium text-white md:text-5xl">
                    Get 25% Discount on your first purchase
                  </h2>
                </div>
                <p className="mt-3">Just Sign Up & Register it now to become member.</p>
              </div>
              <div className="p-3">
                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="newsletter-name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-none border border-gray-300 px-4 py-3 text-gray-900"
                      name="name"
                      id="newsletter-name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-none border border-gray-300 px-4 py-3 text-gray-900"
                      name="email"
                      id="newsletter-email"
                      placeholder="Email Address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-none bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
