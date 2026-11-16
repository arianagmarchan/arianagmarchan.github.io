"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full border border-sky/50 px-4 py-2 text-sm text-sky transition-colors hover:bg-sky/10"
    >
      <Printer aria-hidden="true" className="size-4" />
      Print or save as PDF
    </button>
  );
}
