"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-rose px-5 py-2.5 font-medium text-[#1a1104] transition-transform hover:-translate-y-0.5"
    >
      {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
