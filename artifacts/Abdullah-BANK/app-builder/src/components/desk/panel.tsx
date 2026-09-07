import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-xl bg-surface p-4 text-fg shadow-[var(--shadow-border)] md:p-5",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function PanelTitle({
  className,
  kicker,
  children,
  action,
}: {
  className?: string;
  kicker?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className={cn("mb-4 flex items-start justify-between gap-3", className)}>
      <div>
        {kicker ? (
          <p className="mb-1 text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
            {kicker}
          </p>
        ) : null}
        <h2 className="font-display text-lg leading-snug text-fg">{children}</h2>
      </div>
      {action}
    </header>
  );
}
