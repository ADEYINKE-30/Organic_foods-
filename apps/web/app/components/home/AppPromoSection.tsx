export function AppPromoSection() {
  return (
    <section className="my-4 pb-4">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="rounded-[2rem] bg-amber-400 pt-5">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2">
              <div className="px-4">
                <h2 className="mt-5 text-3xl font-medium text-gray-900">Download Organic App</h2>
                <p className="mt-2 text-gray-800">Online Orders made easy, fast and reliable</p>
                <div className="mb-5 mt-4 flex flex-wrap gap-2">
                  <a href="#" title="App store">
                    <img src="/images/img-app-store.png" alt="app-store" className="h-12 w-auto" />
                  </a>
                  <a href="#" title="Google Play">
                    <img src="/images/img-google-play.png" alt="google-play" className="h-12 w-auto" />
                  </a>
                </div>
              </div>
              <div className="px-4 text-center md:text-left">
                <img
                  src="/images/banner-onlineapp.png"
                  alt="phone"
                  className="mx-auto max-w-full md:mx-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
