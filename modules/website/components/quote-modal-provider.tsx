"use client";

import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GetQuoteModal from "@/modules/website/components/get-quote-modal";

type QuoteModalContextValue = {
  openQuote: (source?: string) => void;
  closeQuote: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

function QuoteUrlIntentHandler({
  openQuote,
}: {
  openQuote: (source?: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("quote") === "open") {
      openQuote("url");
      return;
    }

    if (window.location.hash === "#GetQuote") {
      openQuote("legacy_anchor");
    }
  }, [openQuote, pathname, searchParams]);

  return null;
}

function trackQuoteModalOpen(source: string) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as typeof window & {
    gtag?: (type: "event", name: string, params?: Record<string, string>) => void;
  }).gtag;

  gtag?.("event", "quote_modal_open", {
    source,
    pathname: window.location.pathname,
  });
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const triggerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const openQuote = useCallback((nextSource = "unknown") => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSource(nextSource);
    setOpen(true);
    trackQuoteModalOpen(nextSource);
  }, []);

  const closeQuote = useCallback(() => {
    setOpen(false);

    const url = new URL(window.location.href);
    const hadQuoteParam = url.searchParams.get("quote") === "open";
    const hadQuoteHash = url.hash === "#GetQuote";

    if (hadQuoteParam || hadQuoteHash) {
      url.searchParams.delete("quote");
      if (hadQuoteHash) {
        url.hash = "";
      }

      router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    }

    window.setTimeout(() => {
      triggerRef.current?.focus?.();
    }, 0);
  }, [router]);

  useEffect(() => {
    function openFromUrlIntent() {
      const url = new URL(window.location.href);

      if (url.searchParams.get("quote") === "open") {
        openQuote("url");
        return;
      }

      if (url.hash === "#GetQuote") {
        openQuote("legacy_anchor");
      }
    }

    openFromUrlIntent();
    window.addEventListener("hashchange", openFromUrlIntent);
    window.addEventListener("popstate", openFromUrlIntent);

    return () => {
      window.removeEventListener("hashchange", openFromUrlIntent);
      window.removeEventListener("popstate", openFromUrlIntent);
    };
  }, [openQuote]);

  const value = useMemo(
    () => ({
      openQuote,
      closeQuote,
    }),
    [closeQuote, openQuote],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <QuoteUrlIntentHandler openQuote={openQuote} />
      </Suspense>
      <GetQuoteModal open={open} onClose={closeQuote} source={source} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);

  if (!context) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider.");
  }

  return context;
}
