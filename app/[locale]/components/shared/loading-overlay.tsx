'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOADING_DURATION_MS = 500;

export default function LoadingOverlay() {
  const locale = useLocale();
  const pathname = usePathname();

  const isFrenchLocale = locale === 'fr-ca';
  const logoSrc = isFrenchLocale
    ? '/images/branding/pcvoyages.svg'
    : '/images/branding/travelworks.svg';
  const logoAlt = isFrenchLocale ? 'PC Voyages' : 'TravelWorks';

  return (
    <LoadingOverlayFrame key={`loading-overlay-${pathname}`} logoSrc={logoSrc} logoAlt={logoAlt} />
  );
}

function LoadingOverlayFrame({ logoSrc, logoAlt }: { logoSrc: string; logoAlt: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, LOADING_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={280}
              height={84}
              priority
              className="h-16 w-auto sm:h-20"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}