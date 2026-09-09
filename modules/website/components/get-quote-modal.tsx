"use client";

import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import GetQuoteForm from "@/modules/website/components/get-quote-form";

export type GetQuoteModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function GetQuoteModal({
  open,
  onClose,
  source,
}: GetQuoteModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-4 sm:px-5"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
        aria-label="Close quote modal"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-[920px] flex-col overflow-hidden rounded-2xl border border-indigo-500/25 bg-slate-950 shadow-[0_30px_100px_-45px_rgba(37,99,235,0.8)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-blue-600/10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              Free project quote
            </p>
            <h2 id="quote-modal-title" className="mt-1 font-nacelle text-2xl font-semibold text-white">
              Tell us what you want to build
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 transition hover:border-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close quote modal"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        <div className="quote-modal-scrollbar relative overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <GetQuoteForm source={source} compact onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
