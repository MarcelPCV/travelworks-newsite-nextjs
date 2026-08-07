export function ReadingTime({ minutes, minReadLabel }: { minutes: number; minReadLabel: string }) {
  return (
    <span className="text-sm font-medium text-slate-500">
      {minutes} {minReadLabel}
    </span>
  );
}
