"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface TrackFormProps {
  compact?: boolean;
  initialValue?: string;
  onSubmit?: (value: string) => void;
}

export default function TrackForm({
  compact = false,
  initialValue = "",
  onSubmit,
}: TrackFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const isEmpty = value.trim().length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (isEmpty) return;

    const trimmed = value.trim().toUpperCase();

    if (onSubmit) {
      onSubmit(trimmed);
    } else {
      router.push(`/track?number=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="tracking-number" className="sr-only">
          Tracking number
        </label>
        <input
          id="tracking-number"
          name="tracking-number"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. AUR-2026-104822"
          className="w-full rounded-sm border border-line bg-panel-raised px-4 py-3 font-mono text-sm uppercase tracking-wide text-ivory placeholder:text-muted/50 focus:border-gold"
          aria-invalid={touched && isEmpty}
          aria-describedby={touched && isEmpty ? "tracking-error" : undefined}
        />
        {touched && isEmpty && (
          <p id="tracking-error" className="mt-2 font-mono text-[11px] text-rust">
            Enter a tracking number to continue.
          </p>
        )}
      </div>
      <button type="submit" className={`btn-gold ${compact ? "sm:px-6" : "sm:px-8"}`}>
        Track
      </button>
    </form>
  );
}
