import clsx from 'clsx';
import { TextSection} from './type';

export default function RichTextSection({
  text,
  align = 'center',
  className,
}: TextSection) {
  return (
    <section className={clsx('w-full py-12 md:py-20', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-zinc-800">
        <div
          className={clsx(
            'max-w-5xl',
            {
              left: 'mr-auto text-left',
              center: 'mx-auto text-center',
              right: 'ml-auto text-right',
            }[align]
          )}
        >
          <div
            className="
              prose prose-lg max-w-none
              prose-p:mb-8
              prose-p:text-gray-600
              prose-p:leading-8
              md:prose-xl
              prose-strong:font-semibold
              prose-strong:text-blue-700
            "
          >
            {text}
          </div>
        </div>
      </div>
    </section>
  );
}