'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';


const DISMISSED_STORAGE_KEY = 'travelworks.top_announcement.dismissed';

export default function TopAnnouncementBar() {
  const t = useTranslations('topAnnouncement');
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISSED_STORAGE_KEY) === '1';
    if (dismissed) {
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, '1');
    setIsModalOpen(false);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="border-b border-blue-700 bg-brand-blue text-white">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 py-1 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm leading-5 md:text-left">
            {t.rich('message', {
              strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
            })}
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="text-sm font-medium underline underline-offset-4 transition hover:opacity-90"
              onClick={() => setIsModalOpen(true)}
            >
              <span>
                {t('learnMore')}  
              </span>
            </button>

            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20"
              aria-label={t('dismiss')}
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="top-announcement-modal-title"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2
                id="top-announcement-modal-title"
                className="flex items-center text-xl font-semibold text-brand-blue"
              >
                <ShieldAlert className="h-8 w-8 text-orange-500" />
                <span className="ml-2">
                  {t('modal.title')}
                </span>
              </h2>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                aria-label={t('modal.close')}
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm leading-6 text-zinc-700">
              {t.rich('modal.description', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="rounded-md bg-brand-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                onClick={() => setIsModalOpen(false)}
              >
                {t('modal.button')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
