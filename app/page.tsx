import Link from "next/link";
import TrackForm from "@/components/TrackForm";

const stages = [
  {
    mark: "I",
    title: "Booked & Sealed",
    body: "Bars or dore are weighed, assayed, and sealed into tamper-evident cases at origin, under the eyes of two independent custodians.",
  },
  {
    mark: "II",
    title: "In Transit",
    body: "Armored transport and chartered freight move the consignment, tracked leg by leg from origin vault to destination vault.",
  },
  {
    mark: "III",
    title: "Customs & Assay",
    body: "Export and import clearance, plus any destination assay verification, is logged against the shipment record.",
  },
  {
    mark: "IV",
    title: "Delivered",
    body: "Signed for by a licensed vault custodian at destination, closing the chain of custody.",
  },
];

const stats = [
  { value: "148t", label: "Gold moved in 2025" },
  { value: "37", label: "Countries served" },
  { value: "0.00%", label: "Custody breaks to date" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow mb-6">Precious Metal Logistics</p>
            <h1 className="font-display text-5xl leading-[1.05] text-ivory md:text-6xl">
              Every bar,
              <br />
              <span className="italic text-gold-bright">tracked</span> to the
              vault.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Imperial Transit moves bullion, dore and refined gold between
              mines, refineries and vaults, with a documented chain of
              custody from the moment a bar is sealed to the moment it&apos;s
              signed for.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/track" className="btn-gold">
                Track a Shipment
              </Link>
              <Link href="/about" className="btn-outline">
                How It Works
              </Link>
            </div>
          </div>

          {/* Quick-track panel — the hero's thesis moment */}
          <div className="relative">
            <div className="rounded-sm border border-line bg-panel p-8 shadow-2xl shadow-black/40">
              <p className="eyebrow mb-1">Quick Track</p>
              <p className="mb-6 text-sm text-muted">
                Enter a tracking number to see live status.
              </p>
              <TrackForm compact />
              <p className="mt-4 font-mono text-[11px] text-muted/70">
                Try a demo number: AUR-2026-104822
              </p>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 hidden h-24 w-24 rounded-full border border-gold-dim/40 md:block" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-10 text-center">
              <p className="font-display text-4xl text-gold-bright">{stat.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process — a real sequence, so numbering earns its place */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-3">The Chain of Custody</p>
        <h2 className="font-display text-3xl text-ivory md:text-4xl">
          Four stages, one unbroken record.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.mark} className="bg-ink p-7">
              <span className="font-display text-2xl text-gold-dim">
                {stage.mark}
              </span>
              <h3 className="mt-4 font-display text-lg text-ivory">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-panel">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl text-ivory md:text-3xl">
              Have a tracking number in hand?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Get package type, weight, route and estimated arrival in one
              lookup.
            </p>
          </div>
          <Link href="/track" className="btn-gold whitespace-nowrap">
            Track a Shipment
          </Link>
        </div>
      </section>
    </div>
  );
}
