'use client';

import {
  Blocks,
  Building2,
  FileCheck,
  GraduationCap,
  Handshake,
  Landmark,
  WalletCards,
} from 'lucide-react';
import { useEffect, useRef, useState, type ComponentType } from 'react';
import { SectionAnchorItem, IntegrationSectionId } from './types';

type SectionAnchorMenuProps = {
  items: SectionAnchorItem[];
};

const iconBySectionId: Record<IntegrationSectionId, ComponentType<{ className?: string }>> = {
  gds: Blocks,
  'booking-tools': FileCheck,
  'online-payment-solution': WalletCards,
  'insurance-companies': Landmark,
  'other-partners': Handshake,
  'tourism-schools': GraduationCap,
  'travel-industry-associations': Building2,
};

export default function SectionAnchorMenu({ items }: SectionAnchorMenuProps) {
  const [activeId, setActiveId] = useState<IntegrationSectionId>(items[0]?.id ?? 'gds');
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const observers: IntersectionObserver[] = [];

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (!visible) return;
          setActiveId(item.id);
        },
        {
          root: null,
          rootMargin: '-20% 0px -65% 0px',
          threshold: 0.1,
        },
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [items]);

  const onAnchorClick = (id: IntegrationSectionId) => {
    const section = document.getElementById(id);
    if (!section) return;

    const nav = navRef.current;
    const isLargeViewport = window.matchMedia('(min-width: 1024px)').matches;
    const navRect = nav?.getBoundingClientRect();

    // On large screens, include the occupied top area (navbar offset + menu height)
    // so the section title is never hidden behind sticky elements.
    const occupiedTopArea =
      isLargeViewport && navRect ? Math.max(0, navRect.top) + navRect.height : 0;
    const extraGap = isLargeViewport ? 12 : 20;
    const targetY =
      section.getBoundingClientRect().top + window.scrollY - (occupiedTopArea + extraGap);

    window.scrollTo({ top: targetY, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Integrations section navigation"
      className="z-20 border-y border-gray-200 bg-gradient-to-b from-zinc-300 to-white backdrop-blur lg:sticky lg:top-20"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-2 pb-1 md:justify-center">
          {items.map((item) => {
            const Icon = iconBySectionId[item.id];
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onAnchorClick(item.id)}
                  className={`flex justify-center items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 sm:gap-2 sm:px-4 sm:text-sm ${
                    isActive
                      ? 'bg-[#1e458e] text-white border-b-2 border-amber-400 py-2'
                      : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-brand-blue/50 hover:text-brand-blue py-2'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <div className="flex justify-center items-center">
                    <Icon
                      className={`h-6 w-6 ${isActive ? 'text-orange-400' : 'text-brand-blue'}`}
                    />
                  </div>
                  <span className="whitespace-nowrap font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
