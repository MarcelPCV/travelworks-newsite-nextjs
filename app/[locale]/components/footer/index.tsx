'use client';

import { useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  DEFAULT_ROUTE_LOCALE,
  getPrivacyPolicySegment,
  localeOptions,
} from '@/app/[locale]/locale-config';
import {
  aboutUsLinks,
  loginSlugByOptionId,
  productColumnsByCategory,
  trainingLinks,
  type ProductLinkKey,
} from '@/app/[locale]/components/layout/navbar/navbar-config';
import {
  getAboutUsHref,
  getAskForDemoHref,
  getOneLevelHref,
  getSolutionHref,
  getTrainingHref,
} from '@/app/[locale]/components/layout/navbar/navbar-href';
import FooterLinkColumnsSection, { type FooterLinkColumn } from './footer-link-columns-section';
import NewsSection from './news-section';
import ContactBarSection from './contact-bar-section';

export default function Index() {
  const activeMessageLocale = useLocale();
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer.links');
  const tBenefits = useTranslations('pages.travel-agency-software.benefits');

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const withLocalePrefix = useCallback(
    (path: string) =>
      currentRouteLocale === DEFAULT_ROUTE_LOCALE ? path : `/${currentRouteLocale}${path}`,
    [currentRouteLocale],
  );

  const productKeys = productColumnsByCategory.travelworks.flat() as ProductLinkKey[];
  const benefitsHrefBase = getSolutionHref('benefits', currentRouteLocale, withLocalePrefix);
  const privacyPolicyHref = getOneLevelHref(
    getPrivacyPolicySegment(currentRouteLocale),
    withLocalePrefix,
  );

  const benefitsLinks = [
    { label: tBenefits('block-type-sections.0.title'), href: `${benefitsHrefBase}#cloud` },
    { label: tBenefits('block-type-sections.1.title'), href: `${benefitsHrefBase}#efficient` },
    { label: tBenefits('block-type-sections.2.title'), href: `${benefitsHrefBase}#scalable` },
    { label: tBenefits('block-type-sections.3.title'), href: `${benefitsHrefBase}#secure` },
    { label: tBenefits('block-type-sections.4.title'), href: `${benefitsHrefBase}#smart` },
    { label: tBenefits('block-type-sections.5.title'), href: `${benefitsHrefBase}#reliable` },
    { label: tBenefits('block-type-sections.6.title'), href: `${benefitsHrefBase}#evolutionary` },
  ];

  const columns: FooterLinkColumn[] = [
    {
      id: 'solution',
      heading: t('topLevel.products'),
      links: productKeys.map((key) => ({
        label: t(`products.links.${key}`),
        href: getSolutionHref(key, currentRouteLocale, withLocalePrefix),
      })),
    },
    {
      id: 'benefits',
      heading: t('products.links.benefits'),
      links: benefitsLinks,
    },
    {
      id: 'about-us',
      heading: t('topLevel.aboutUs'),
      links: [
        ...aboutUsLinks.map((key) => ({
          label: t(`aboutUs.${key}`),
          href: getAboutUsHref(key, currentRouteLocale, withLocalePrefix),
        })),
        {
          label: t('cta.askForDemo'),
          href: getAskForDemoHref(currentRouteLocale, withLocalePrefix),
        },
      ],
    },
    {
      id: 'training',
      heading: t('topLevel.training'),
      links: trainingLinks.map((key) => ({
        label: t(`training.${key}`),
        href: getTrainingHref(key, currentRouteLocale, withLocalePrefix),
      })),
    },
    {
      id: 'log-in',
      heading: t('cta.logIn'),
      links: [
        {
          label: t('cta.logInOptions.travelworks'),
          href: getOneLevelHref(loginSlugByOptionId.Travelworks, withLocalePrefix),
        },
        {
          label: t('cta.logInOptions.support'),
          href: getOneLevelHref(loginSlugByOptionId.Support, withLocalePrefix),
        },
        {
          label: t('cta.logInOptions.trainingPlatform'),
          href: getOneLevelHref(loginSlugByOptionId.Training, withLocalePrefix),
        },
        {
          label: t('cta.logInOptions.knowledgeBase'),
          href: getOneLevelHref(loginSlugByOptionId['Knowledge Base'], withLocalePrefix),
        },
      ],
    },
    {
      id: 'privacy',
      heading: tFooter('privacy.heading'),
      links: [
        {
          label: tFooter('privacy.policyLabel'),
          href: privacyPolicyHref,
        },
      ],
    },
  ];

  return (
    <div>
      <NewsSection />
      <ContactBarSection />
      <FooterLinkColumnsSection columns={columns} />
    </div>
  );
}
