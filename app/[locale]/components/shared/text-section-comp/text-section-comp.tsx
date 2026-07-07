import { TextSection } from './type';
import TitleSection from '../../ui/title-section';

export default function RichTextSection({ title, description }: TextSection) {
  return (
    <section>
      {title && (
        <TitleSection title={title} alignment="center" size="extra-large" color="text-brand-blue" />
      )}
      {description && (
        <div className="mx-auto max-w-2xl mt-4 text-md leading-8 text-neutral-dark">
          {description}
        </div>
      )}
    </section>
  );
}
