import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold-bright font-display text-base">
                A
              </span>
              <span className="font-display text-lg text-ivory">Aurum Transit</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Chain-of-custody logistics for bullion, dore and refined gold,
              from mine and refinery to vault.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted hover:text-gold-bright">Home</Link></li>
              <li><Link href="/track" className="text-muted hover:text-gold-bright">Track Shipment</Link></li>
              <li><Link href="/about" className="text-muted hover:text-gold-bright">About</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-gold-bright">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Registered Office</p>
            <p className="text-sm text-muted">
              27 Bond Street<br />
              London, W1S 2BQ, United Kingdom
            </p>
            <p className="mt-3 text-sm text-muted">
              ops@aurumtransit.example
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest text-muted/70 md:flex-row md:items-center">
          <span>&copy; {new Date().getFullYear()} Aurum Transit. All rights reserved.</span>
          <span>Demo build — not a licensed carrier</span>
        </div>
      </div>
    </footer>
  );
}
