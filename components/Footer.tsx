import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-gray-800">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold-bright font-display text-base">
                A
              </span>
              <span className=" text-lg text-yellow-400">Gold Track</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white">
             Trusted gold shipping since 2020
            </p>
          </div>

          <div>
            <p className="text-yellow-500 mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link href="/" className="text-gray-200 hover:text-gold-bright">Track Shipment</Link></li>
              <li><Link href="/about" className="text-gray-200 hover:text-gold-bright">Insurance Info</Link></li>
              <li><Link href="/contact" className="text-gray-200 hover:text-gold-bright">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-yellow-500 mb-4">Contact</p>
            <p className="text-sm text-gray-200">
              27 Bond Street<br />
              London, W1S 2BQ, United Kingdom
            </p>
            <p className="mt-3 text-sm text-gray-200">
              ops@imperialtransit.example
            </p>
          </div>
        </div>

        <div className="mt-12 text-center gap-4 border-t border-line pt-6  text-[13px]  tracking-widest text-gray-300 md:flex-row md:items-center">
          <span>&copy; {new Date().getFullYear()} GoldTrack. All rights reserved.</span>
        
        </div>
      </div>
    </footer>
  );
}
