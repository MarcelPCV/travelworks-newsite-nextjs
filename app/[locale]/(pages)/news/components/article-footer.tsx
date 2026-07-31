import Link from 'next/link';
import { ShareButtons } from './share-buttons';

export function ArticleFooter({
  newsPath,
  articlePath,
  articleTitle,
}: {
  newsPath: string;
  articlePath: string;
  articleTitle: string;
}) {
  return (
    <footer className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href={newsPath} className="text-sm font-semibold text-blue-700 hover:text-blue-800">
          Back to news
        </Link>
        <ShareButtons path={articlePath} title={articleTitle} />
      </div>
    </footer>
  );
}
