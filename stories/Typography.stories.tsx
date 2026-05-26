import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PoppinsTypographySystem: Story = {
  render: () => (
    <div className="mx-auto max-w-5xl space-y-12 rounded-2xl border border-zinc-700 bg-zinc-950 p-8 text-zinc-100">
      <div className="grid gap-10 md:grid-cols-2">
        <section className="space-y-4">
          <h2 className="type-h6 text-zinc-400">Headings</h2>
          <div className="space-y-3">
            <h1 className="type-h1">Heading 1</h1>
            <h2 className="type-h2">Heading 2</h2>
            <h3 className="type-h3">Heading 3</h3>
            <h4 className="type-h4 uppercase tracking-wide">Heading 4</h4>
            <h5 className="type-h5 underline decoration-zinc-500">Heading 5</h5>
            <h6 className="type-h6">Heading 6</h6>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="type-h6 text-zinc-400">Body Font</h2>
          <p className="type-normal-16 max-w-prose text-zinc-300">
            Coloring book flexitarian letterpress, mixtape kogi gochujang brunch meditation viral kickstarter
            dreamcatcher VHS pork belly waistcoat banh mi. Helvetica single-origin coffee tofu ethical hella
            tumblr cronut.
          </p>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="type-h6 text-zinc-400">Font Weights</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <p className="font-thin text-3xl">Thin 100</p>
          <p className="font-extralight text-3xl">ExtraLight 200</p>
          <p className="font-light text-3xl">Light 300</p>
          <p className="font-normal text-3xl">Regular 400</p>
          <p className="font-medium text-3xl">Medium 500</p>
          <p className="font-semibold text-3xl">SemiBold 600</p>
          <p className="font-bold text-3xl">Bold 700</p>
          <p className="font-extrabold text-3xl">ExtraBold 800</p>
          <p className="font-black text-3xl">Black 900</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="type-h6 text-zinc-400">Colours</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="h-20 w-full bg-[#ff3b3f]" />
            <p className="mt-2 type-normal-16">Primary</p>
          </div>
          <div>
            <div className="h-20 w-full bg-[#1b66d9]" />
            <p className="mt-2 type-normal-16">Secondary</p>
          </div>
          <div>
            <div className="h-20 w-full bg-[#404046]" />
            <p className="mt-2 type-normal-16">Tertiary</p>
          </div>
        </div>
      </section>
    </div>
  ),
};