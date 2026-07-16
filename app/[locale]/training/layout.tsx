import MenuTraining from '@/app/[locale]/components/layout/menu-training/menu-training';

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MenuTraining />
			{children}
		</>
	);
}

