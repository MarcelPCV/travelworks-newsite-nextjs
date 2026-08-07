import { enClientsPageData } from './en';
import { frClientsPageData } from './fr';

export function getClientsPageData(locale: string) {
  return locale === 'fr-ca' ? frClientsPageData : enClientsPageData;
}
