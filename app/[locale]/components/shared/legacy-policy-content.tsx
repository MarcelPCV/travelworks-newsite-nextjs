'use client';

import { useEffect, useRef } from 'react';

type LegacyPolicyContentProps = {
  html: string;
};

export default function LegacyPolicyContent({ html }: LegacyPolicyContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    content.querySelectorAll<HTMLElement>('.acordeon__item').forEach((item) => {
      const title = item.querySelector('label')?.textContent?.trim();
      const body = item.querySelector<HTMLElement>('.acordeon__contenido');
      if (!title || !body) {
        return;
      }

      const details = document.createElement('details');
      details.className = 'group border-b border-slate-200 last:border-b-0';

      const summary = document.createElement('summary');
      summary.className = 'cursor-pointer list-none px-5 py-4 font-bold text-brand-blue marker:hidden hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue';
      summary.textContent = title;

      const panel = document.createElement('div');
      panel.className = 'border-t border-slate-200 px-5 py-5';
      panel.append(...Array.from(body.childNodes));

      details.append(summary, panel);
      item.replaceWith(details);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="trip-policy-content text-slate-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}