import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Aurum Transit",
};

const principles = [
  {
    title: "Dual custody, always",
    body: "No single person ever has unsupervised access to a consignment. Every handoff is witnessed and logged.",
  },
  {
    title: "Independent assay",
    body: "Weight and purity are verified by an accredited third party at origin, and re-verified on request at destination.",
  },
  {
    title: "Insured in transit",
    body: "Every shipment is insured for full declared value from the moment it's sealed to the moment it's signed for.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <p className="eyebrow mb-4">About Aurum Transit</p>
          <h1 className="font-display text-4xl leading-tight text-ivory md:text-5xl">
            Moving gold is simple. Proving it never left the chain is the
            hard part.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Aurum Transit specializes in the secure movement of bullion,
            dore and refined gold between mines, refineries, and bonded
            vaults. Founded by veterans of precious-metal logistics and
            insurance underwriting, we built the company around one
            principle: a shipment&apos;s value is only as good as the record
            proving where it&apos;s been.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow mb-3">What We Hold Ourselves To</p>
        <h2 className="font-display text-3xl text-ivory">
          Three non-negotiables.
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {principles.map((p) => (
            <div key={p.title} className="grid gap-2 py-8 md:grid-cols-[240px_1fr] md:gap-8">
              <h3 className="font-display text-xl text-gold-bright">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Where We Operate</p>
            <p className="text-sm leading-relaxed text-muted">
              Our network spans origin markets across West and Southern
              Africa, refining hubs in the UAE and Switzerland, and vault
              destinations across Europe, North America and Asia. Every
              route is run with licensed armored-transport and freight
              partners, coordinated through a single tracking record.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">A Note on This Site</p>
            <p className="text-sm leading-relaxed text-muted">
              This is a demonstration build showing what a gold-shipment
              tracking product could look like end to end: a marketing
              site, a tracking lookup backed by a real database, and a
              contact form. Shipment records shown here are sample data,
              not live consignments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
