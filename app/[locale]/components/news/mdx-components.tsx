import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
import { getBlurDataURL } from '@/app/[locale]/news/lib/image';

type CalloutProps = {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
};

function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: 'border-sky-300 bg-sky-50 text-sky-900',
    warning: 'border-amber-300 bg-amber-50 text-amber-900',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  };

  return <div className={`my-6 rounded-xl border px-4 py-3 ${styles[type]}`}>{children}</div>;
}

function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-6 aspect-video overflow-hidden rounded-xl border border-slate-200">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export const newsMdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold text-slate-900" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-slate-900" {...props} />,
  p: (props) => <p className="mt-4 leading-7 text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-4 border-blue-600 bg-blue-50 px-4 py-3 italic text-slate-700"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  th: (props) => <th className="bg-slate-100 px-3 py-2 text-left text-sm font-semibold" {...props} />,
  td: (props) => <td className="border-t border-slate-200 px-3 py-2 text-sm text-slate-700" {...props} />,
  code: (props) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800" {...props} />
  ),
  pre: (props) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100" {...props} />
  ),
  img: (props) => (
    <Image
      src={props.src || '/images/components/hero-carousel/hero.png'}
      alt={props.alt || ''}
      width={1200}
      height={675}
      className="my-6 h-auto w-full rounded-xl border border-slate-200"
      placeholder="blur"
      blurDataURL={getBlurDataURL()}
      sizes="(max-width: 768px) 100vw, 900px"
    />
  ),
  Callout,
  YouTube,
};
