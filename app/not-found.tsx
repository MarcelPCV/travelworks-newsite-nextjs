import Link from 'next/link';
import Image from 'next/image';
import { Home, SearchX } from 'lucide-react';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const requestHeaders = await headers();
  const routeLocale = requestHeaders.get('x-travelworks-route-locale') ?? 'en';
  const homeHref = routeLocale === 'en' ? '/' : `/${routeLocale}`;
  const isFrenchLocale = routeLocale === 'fr';
  const logoSrc = isFrenchLocale
    ? '/images/branding/pcvoyages.svg'
    : '/images/branding/travelworks.svg';
  const logoAlt = isFrenchLocale ? 'PC Voyages' : 'TravelWorks';
  const t = await getTranslations('notFound');

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-neutral-background px-4 py-16"
      aria-labelledby="not-found-title"
    >
      <section className="text-center">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={330}
          height={117}
          priority
          className="mx-auto mb-10 h-16 w-auto sm:h-16"
        />
        <hr className="my-8 border-t-2 border-neutral-300" />
        <div className="flex justify-center">
          <div className="flex items-center justify-center rounded-full border-b-2 border-orange-400 bg-white p-3 shadow-md">
            <SearchX className="h-10 w-10 text-orange-400" aria-hidden="true" />
          </div>
        </div>
        <h1 id="not-found-title" className="mt-8 text-5xl font-bold text-brand-blue">
          {t('title')}
        </h1>
        <h2 className="mt-3 text-xl font-semibold text-brand-blue">
          {t('message')}
          </h2>
        <Link
          href={homeHref}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-orange-dark px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-dark"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          {t('home')}
        </Link>
      </section>
    </main>
  );
}