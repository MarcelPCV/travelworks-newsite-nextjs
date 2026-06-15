import {
  aboutUsSlugs,
  getAboutUsSegment,
  getDemoSlug,
  getTrainingSegment,
  getTravelAgencySoftwareSegment,
  trainingSlugs,
  travelAgencySoftwareSlugs,
} from '@/app/[locale]/locale-config';
import {
  aboutUsSlugByKey,
  productSlugByKey,
  trainingSlugByKey,
  type AboutUsLinkKey,
  type ProductLinkKey,
  type TrainingLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';

export type WithLocalePrefix = (path: string) => string;

export function getOneLevelHref(slug: string, withLocalePrefix: WithLocalePrefix): string {
  return withLocalePrefix(`/${slug}`);
}

export function getSolutionHref(
  linkKey: ProductLinkKey,
  routeLocale: string,
  withLocalePrefix: WithLocalePrefix
): string {
  const canonicalSlug = productSlugByKey[linkKey];
  const localizedSlug = travelAgencySoftwareSlugs[canonicalSlug]?.[routeLocale] ?? canonicalSlug;
  const localizedSegment = getTravelAgencySoftwareSegment(routeLocale);
  return withLocalePrefix(`/${localizedSegment}/${localizedSlug}`);
}

export function getAboutUsHref(
  linkKey: AboutUsLinkKey,
  routeLocale: string,
  withLocalePrefix: WithLocalePrefix
): string {
  const canonicalSlug = aboutUsSlugByKey[linkKey];
  const localizedSlug = aboutUsSlugs[canonicalSlug]?.[routeLocale] ?? canonicalSlug;
  const localizedSegment = getAboutUsSegment(routeLocale);
  return localizedSlug ? withLocalePrefix(`/${localizedSegment}/${localizedSlug}`) : withLocalePrefix(`/${localizedSegment}`);
}

export function getTrainingHref(
  linkKey: TrainingLinkKey,
  routeLocale: string,
  withLocalePrefix: WithLocalePrefix
): string {
  const canonicalSlug = trainingSlugByKey[linkKey];
  const localizedSlug = trainingSlugs[canonicalSlug]?.[routeLocale] ?? canonicalSlug;
  const localizedSegment = getTrainingSegment(routeLocale);
  return withLocalePrefix(`/${localizedSegment}/${localizedSlug}`);
}

export function getAskForDemoHref(routeLocale: string, withLocalePrefix: WithLocalePrefix): string {
  return withLocalePrefix(`/${getDemoSlug(routeLocale)}`);
}
