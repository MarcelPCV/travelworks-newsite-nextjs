'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function CmsUnavailable() {
  const t = useTranslations('cmsUnavailable');

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm max-w-md w-full">
        <h2 className="mb-4 text-2xl font-semibold text-red-800">{t('title')}</h2>
        <p className="text-red-600">{t('description')}</p>
      </div>
    </div>
  );
}
