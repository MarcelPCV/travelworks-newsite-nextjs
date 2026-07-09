export function NewsletterSection() {
  return (
    <section className="mt-14 rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 px-6 py-10 text-white md:px-10">
      <h2 className="text-2xl font-semibold">Stay updated with TravelWorks news</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-200">
        Receive product updates, industry insights, and practical guidance for travel agency teams.
      </p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:border-white focus:outline-none"
          aria-label="Email"
        />
        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
