import MenuTraining from '@/app/[locale]/(pages)/training/components/menu-training/menu-training';

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuTraining />
      {children}
    </>
  );
}
