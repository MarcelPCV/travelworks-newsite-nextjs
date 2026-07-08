"use client";

import { useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  DEFAULT_ROUTE_LOCALE,
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

  const currentRouteLocale =
    localeOptions.find((item) => item.messageLocale === activeMessageLocale)?.routeLocale ??
    DEFAULT_ROUTE_LOCALE;

  const withLocalePrefix = useCallback(
    (path: string) =>
      currentRouteLocale === DEFAULT_ROUTE_LOCALE ? path : `/${currentRouteLocale}${path}`,
    [currentRouteLocale],
  );

  const productKeys = productColumnsByCategory.travelworks.flat() as ProductLinkKey[];

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
  ];

  return (
    <div>
      <NewsSection />
      <ContactBarSection />
      <FooterLinkColumnsSection columns={columns} />
    </div>
  );
}
