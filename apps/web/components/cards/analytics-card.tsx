import { Separator } from "@repo/web/components/ui/separator";

export interface MetricCardProps {
  title: string;
  value: string;
}

export function AnalyticCard({ title, value }: MetricCardProps) {
  return (
    <div className="flex w-[280px] flex-col rounded-lg border bg-white">
      <span className="text-gray-500 font-medium md:text-sm px-4 py-2">
        {title}
      </span>
      <Separator />
      <div className="text-xl font-semibold px-4 py-2">{value}</div>
    </div>
  );
}
