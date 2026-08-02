import { Suspense } from "react";
import type { Metadata } from "next";
import TrackPageClient from "./TrackPageClient";

export const metadata: Metadata = {
  title: "Track Shipment — Aurum Transit",
};

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-center text-muted">Loading…</div>}>
      <TrackPageClient />
    </Suspense>
  );
}
