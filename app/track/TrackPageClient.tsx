"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TrackForm from "@/components/TrackForm";
import ShipmentResult from "@/components/ShipmentResult";
import type { Shipment } from "@/lib/supabase";

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; shipment: Shipment }
  | { status: "error"; message: string };

const DEMO_NUMBERS = [
  "AUR-2026-104822",
  "AUR-2026-104910",
  "AUR-2026-105033",
  "AUR-2026-105117",
  "AUR-2026-105200",
];

export default function TrackPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numberFromUrl = searchParams.get("number") ?? "";

  const [state, setState] = useState<LookupState>({ status: "idle" });

  async function lookup(number: string) {
    setState({ status: "loading" });
    try {
      const res = await fetch(`/api/track?number=${encodeURIComponent(number)}`);
      const body = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: body.error ?? "Shipment not found." });
        return;
      }

      setState({ status: "success", shipment: body.shipment as Shipment });
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the tracking service. Check your connection and try again.",
      });
    }
  }

  useEffect(() => {
    if (numberFromUrl) {
      lookup(numberFromUrl);
    } else {
      setState({ status: "idle" });
    }
  }, [numberFromUrl]);

  function handleSubmit(value: string) {
    router.push(`/track?number=${encodeURIComponent(value)}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="eyebrow mb-3 text-center">Track Shipment</p>
      <h1 className="text-center font-display text-4xl text-ivory md:text-5xl">
        Where&apos;s your gold?
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted">
        Enter the tracking number from your shipment confirmation to see its
        current status, route and estimated arrival.
      </p>

      <div className="mt-10">
        <TrackForm initialValue={numberFromUrl} onSubmit={handleSubmit} />
      </div>

      <div className="mt-12">
        {state.status === "loading" && (
          <div className="mx-auto max-w-2xl animate-pulse rounded-sm border border-line bg-panel p-8">
            <div className="h-3 w-32 rounded bg-line" />
            <div className="mt-4 h-6 w-48 rounded bg-line" />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-4 rounded bg-line" />
              <div className="h-4 rounded bg-line" />
              <div className="h-4 rounded bg-line" />
              <div className="h-4 rounded bg-line" />
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div className="mx-auto max-w-2xl rounded-sm border border-rust/40 bg-panel p-8 text-center">
            <p className="font-mono text-sm text-rust">{state.message}</p>
            <p className="mt-3 text-sm text-muted">
              Double-check the tracking number, or try one of the demo
              numbers below.
            </p>
          </div>
        )}

        {state.status === "success" && <ShipmentResult shipment={state.shipment} />}

        {/* {state.status === "idle" && (
          <div className="mx-auto max-w-2xl rounded-sm border border-dashed border-line p-8 text-center">
            <p className="text-sm text-muted">
              No tracking number entered yet — try one of the demo shipments:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {DEMO_NUMBERS.map((n) => (
                <button
                  key={n}
                  onClick={() => router.push(`/track?number=${n}`)}
                  className="rounded-sm border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-gold hover:text-gold-bright"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
