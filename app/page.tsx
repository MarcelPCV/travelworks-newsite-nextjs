import { notFound } from 'next/navigation';
import LayoutRenderer from './[locale]/[slug]/blocks/layout-renderer';
import { getCmsPageBySlug } from './[locale]/cms-page';
import { DEFAULT_ROUTE_LOCALE, getHomepageSlug } from './[locale]/locale-config';
import CmsUnavailable from './[locale]/components/cms-unavailable';
import IntlProviderWrapper from './[locale]/intl-provider';
import enUS from '../messages/en-us.json';

export default async function RootPage() {
  const page = await getCmsPageBySlug(getHomepageSlug(DEFAULT_ROUTE_LOCALE), DEFAULT_ROUTE_LOCALE);

  if (!page) {
    return (
      <IntlProviderWrapper locale="en-us" messages={enUS}>
        <CmsUnavailable />
      </IntlProviderWrapper>
    );
  }

  return (
    <IntlProviderWrapper locale="en-us" messages={enUS}>
      <main>
        <h1 className="sr-only">{page.title ?? 'Home'}</h1>
        <div className="flex w-full flex-col gap-4 py-2">
          <LayoutRenderer layout={Array.isArray(page.layout) ? page.layout : []} pageTitle={page.title} />
        </div>
      </main>
    </IntlProviderWrapper>
  );
}
