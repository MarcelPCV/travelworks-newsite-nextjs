import type { ContentLocale } from '../types';
import { toContentLocale } from './categories';

type NewsUiLabels = {
  allNews: string;
  pageTitle: string;
  pageDescription: string;
};

const LABELS: Record<ContentLocale, NewsUiLabels> = {
  'en-us': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription:
      'News, updates, and practical insights for travel agencies using TravelWorks.',
  },
  'en-ca': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription:
      'News, updates, and practical insights for travel agencies using TravelWorks.',
  },
  'en-au': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription:
      'News, updates, and practical insights for travel agencies using TravelWorks.',
  },
  'fr-ca': {
    allNews: 'Toutes les nouvelles',
    pageTitle: 'Nouvelles TravelWorks',
    pageDescription:
      'Nouvelles, mises a jour et conseils pratiques pour les agences de voyages.',
  },
};

export function getNewsLabels(locale: string): NewsUiLabels {
  return LABELS[toContentLocale(locale)];
}
