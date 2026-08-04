import type { ContentLocale } from '../types';
import { toContentLocale } from './categories';

type NewsUiLabels = {
  allNews: string;
  pageTitle: string;
  pageDescription: string;
  featured: string;
  readStory: string;
  readMore: string;
  minRead: string;
};

const LABELS: Record<ContentLocale, NewsUiLabels> = {
  'en-us': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription: 'News, updates, and practical insights for travel agencies using TravelWorks.',
    featured: 'Featured',
    readStory: 'Read story',
    readMore: 'Read more',
    minRead: 'min read',
  },
  'en-ca': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription: 'News, updates, and practical insights for travel agencies using TravelWorks.',
    featured: 'Featured',
    readStory: 'Read story',
    readMore: 'Read more',
    minRead: 'min read',
  },
  'en-au': {
    allNews: 'All News',
    pageTitle: 'TravelWorks News',
    pageDescription: 'News, updates, and practical insights for travel agencies using TravelWorks.',
    featured: 'Featured',
    readStory: 'Read story',
    readMore: 'Read more',
    minRead: 'min read',
  },
  'fr-ca': {
    allNews: 'Toutes les nouvelles',
    pageTitle: 'Nouvelles TravelWorks',
    pageDescription: 'Nouvelles, mises a jour et conseils pratiques pour les agences de voyages.',
    featured: 'En vedette',
    readStory: "Lire l'article",
    readMore: 'En savoir plus',
    minRead: 'min de lecture',
  },
};

export function getNewsLabels(locale: string): NewsUiLabels {
  return LABELS[toContentLocale(locale)];
}
