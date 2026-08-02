import type { Shipment } from "@/lib/supabase";

const STATUS_LABEL: Record<Shipment["status"], string> = {
  booked: "Booked",
  in_transit: "In Transit",
  customs: "In Customs",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  delayed: "Delayed",
};

const STATUS_COLOR: Record<Shipment["status"], string> = {
  booked: "text-muted border-muted/40",
  in_transit: "text-gold-bright border-gold/50",
  customs: "text-gold-bright border-gold/50",
  out_for_delivery: "text-verdigris border-verdigris/50",
  delivered: "text-verdigris border-verdigris/50",
  delayed: "text-rust border-rust/50",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatEta(iso: string, status: Shipment["status"]) {
  if (status === "delivered") return "Delivered";
  const target = new Date(iso).getTime();
  const now = Date.now();
  const diffHours = Math.round((target - now) / (1000 * 60 * 60));

  if (diffHours <= 0) return "Arriving imminently";
  if (diffHours < 24) return `In ~${diffHours}h`;
  const days = Math.round(diffHours / 24);
  return `In ~${days} day${days === 1 ? "" : "s"}`;
}

export default function ShipmentResult({ shipment }: { shipment: Shipment }) {
  const eta = formatEta(shipment.estimated_arrival, shipment.status);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-sm border border-gold-dim/60 bg-panel">
        {/* Certificate header */}
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-line p-8">
          <div>
            <p className="eyebrow mb-2">Certificate of Transit</p>
            <p className="font-mono text-lg tracking-wide text-ivory">
              {shipment.tracking_number}
            </p>
          </div>
          <div className={`seal ${STATUS_COLOR[shipment.status]}`}>
            <span className="text-center font-mono text-[10px] uppercase leading-tight">
              {STATUS_LABEL[shipment.status]}
            </span>
          </div>
        </div>

        {/* Route */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 py-8">
          <div>
            <p className="eyebrow mb-1">Origin</p>
            <p className="font-display text-lg text-ivory">{shipment.origin}</p>
          </div>
          <div className="flex flex-col items-center text-gold-dim">
            <span className="font-mono text-xs">{eta}</span>
            <span aria-hidden className="mt-1 h-px w-16 bg-gold-dim/60" />
          </div>
          <div className="text-right">
            <p className="eyebrow mb-1">Destination</p>
            <p className="font-display text-lg text-ivory">{shipment.destination}</p>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="stub-edge" aria-hidden />

        {/* Ledger of details */}
        <dl className="grid grid-cols-1 gap-x-8 gap-y-5 p-8 sm:grid-cols-2">
          <div>
            <dt className="eyebrow mb-1">Package Type</dt>
            <dd className="font-sans text-sm text-ivory">{shipment.package_type}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Weight</dt>
            <dd className="font-mono text-sm text-ivory">
              {shipment.weight_kg.toLocaleString("en-US", {
                maximumFractionDigits: 3,
              })}{" "}
              kg
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Carrier</dt>
            <dd className="font-sans text-sm text-ivory">
              {shipment.carrier ?? "Unassigned"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Status</dt>
            <dd className="font-sans text-sm text-ivory">
              {STATUS_LABEL[shipment.status]}
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Shipped</dt>
            <dd className="font-mono text-sm text-ivory">
              {formatDate(shipment.shipped_at)}
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Estimated Arrival</dt>
            <dd className="font-mono text-sm text-gold-bright">
              {formatDate(shipment.estimated_arrival)}
            </dd>
          </div>
          {shipment.notes && (
            <div className="sm:col-span-2">
              <dt className="eyebrow mb-1">Latest Update</dt>
              <dd className="text-sm leading-relaxed text-muted">{shipment.notes}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
