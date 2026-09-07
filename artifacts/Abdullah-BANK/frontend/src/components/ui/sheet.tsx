import type { ComponentProps } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Sheet(props: ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />;
}

function SheetTrigger(props: ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: ComponentProps<typeof Dialog.Content> & { side?: "right" | "bottom" }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out" />
      <Dialog.Content
        className={cn(
          "fixed z-50 flex flex-col bg-surface text-fg shadow-[var(--shadow-border)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          side === "right"
            ? "inset-y-0 right-0 h-full w-full max-w-md rounded-l-xl"
            : "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-md text-muted hover:bg-elevated hover:text-fg">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 p-5 pr-14", className)} {...props} />;
}

function SheetTitle(props: ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title className="font-display text-xl text-fg" {...props} />;
}

function SheetDescription(props: ComponentProps<typeof Dialog.Description>) {
  return <Dialog.Description className="text-sm text-muted" {...props} />;
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription };
