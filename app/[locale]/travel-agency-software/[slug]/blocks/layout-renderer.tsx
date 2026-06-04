import { CarouselBlock } from './hero-carousel';
import IconsGridBlock from './icons-grid-block';
import HeroPage from './hero-page';
import type { CmsBlock } from './types';

export default function LayoutRenderer({ layout, pageTitle }: { layout: CmsBlock[]; pageTitle?: string }) {
  return (
    <>
      {layout.map((block, index) => {
        const key = String(block.id ?? `${block.blockType ?? 'block'}-${index}`);

        switch (block.blockType) {
          case 'carousel-block':
            return <CarouselBlock key={key} block={block} pageTitle={pageTitle} />;
          case 'icons-grid':
            return <IconsGridBlock key={key} block={block} pageTitle={pageTitle} />;
          case 'hero-page-banner':
            return <HeroPage key={key} block={block} pageTitle={pageTitle} />;
          default:
            return process.env.NODE_ENV === 'development' ? (
              <div key={key} className="mx-auto w-full max-w-7xl rounded border border-dashed border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
                Unknown block type: {String(block.blockType ?? 'undefined')}
              </div>
            ) : null;
        }
      })}
    </>
  );
}
