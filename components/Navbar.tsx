import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/track", label: "Track Shipment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50  bg-gray-800 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold-bright font-display text-lg">
            A
          </span>
            <span className=" text-xl tracking-wide text-yellow-400">
            GoldTrack
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font text-[15px]  tracking-widest text-white transition-colors hover:text-gold-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* <Link href="/track" className="btn-outline hidden md:inline-flex !py-2 !px-4">
          Track
        </Link> */}
      </div>
      {/* Mobile nav */}
      <nav className="flex items-center justify-center gap-6 border-t border-line py-3 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-[11px] uppercase tracking-widest text-gray-200 transition-colors hover:text-gold-bright"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
