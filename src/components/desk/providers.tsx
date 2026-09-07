import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { useMarketFeed } from "@/lib/desk/use-market-feed";
import { useDeskStore } from "@/lib/desk/store";

const queryClient = new QueryClient();

function MarketFeed() {
  useMarketFeed();
  return null;
}

export function DeskProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    void Promise.resolve(useDeskStore.persist.rehydrate()).finally(() => {
      useDeskStore.setState({ hydrated: true });
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MarketFeed />
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-surface text-fg border-border font-sans",
          },
        }}
      />
    </QueryClientProvider>
  );
}
