import { cn } from "@/lib/utils";
import { signedClass } from "@/lib/desk/format";

export function MetricTile({
  label,
  value,
  hint,
  signed,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  signed?: number;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-elevated p-4", className)}>
      <p className="text-[11px] font-medium tracking-[0.14em] text-subtle uppercase">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-2xl leading-none tabular-nums",
          signed != null ? signedClass(signed) : "text-fg",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
