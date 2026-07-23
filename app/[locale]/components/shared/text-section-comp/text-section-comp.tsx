import { TextSection } from './type';
import TitleSection from '../../ui/title-section';

export default function RichTextSection({ title, description }: TextSection) {
  return (
    <section className="py-5">
      {title && (
        <TitleSection 
          title={title} 
          alignment="center" 
          size="extra-large" 
          color="text-brand-blue"
          titleMaxWidth="max-w-3xl"
        />
      )}
      {description && (
        <div className="mx-auto max-w-2xl mt-4 text-md leading-8 text-neutral-dark text-center">
          {description}
        </div>
      )}
    </section>
  );
}
