# Imperial Transit — Gold Shipment Tracking

A Next.js (App Router) + Supabase site for tracking gold shipments. Includes
a home page, About, Contact, and a Track Shipment lookup that returns
package type, weight, origin/destination, status, and estimated arrival.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Supabase (Postgres + JS client) for shipment and contact data

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** in your project and run the contents of
   [`supabase/schema.sql`](./supabase/schema.sql). This creates the
   `shipments` and `contact_messages` tables, sets Row Level Security
   policies, and seeds five demo shipments (including `AUR-2026-104822`).
3. In **Project Settings → API**, copy your **Project URL** and
   **anon public key**.

## 3. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 4. Run it

```bash
npm run dev
```

Visit `http://localhost:3000`. Try `/track?number=AUR-2026-104822` or use
the demo buttons on the Track page.

## Project structure

```
app/
  page.tsx              Home page (hero, process, quick-track)
  about/page.tsx         About page
  contact/page.tsx       Contact page
  track/                 Track Shipment page (+ client logic)
  api/track/route.ts     GET lookup by tracking number
  api/contact/route.ts   POST contact form submissions
components/
  Navbar.tsx, Footer.tsx
  TrackForm.tsx           Tracking-number input
  ShipmentResult.tsx      Certificate-style result card
  ContactForm.tsx
lib/
  supabase.ts             Supabase client + Shipment type
supabase/
  schema.sql               Tables, RLS policies, demo seed data
```

## Adding real shipments

Insert rows into `shipments` directly from the Supabase Table Editor, or via
SQL:

```sql
insert into shipments
  (tracking_number, package_type, weight_kg, origin, destination, status, carrier, shipped_at, estimated_arrival, notes)
values
  ('AUR-2026-999999', '1kg Gold Bars', 5.000, 'London, UK', 'London, UK', 'in_transit', 'Brink''s Global Logistics', now(), now() + interval '3 days', 'Departed origin vault.');
```

`status` must be one of: `booked`, `in_transit`, `customs`,
`out_for_delivery`, `delivered`, `delayed`.

## Notes

- Row Level Security is enabled. The anon key can `select` from `shipments`
  (needed for public tracking lookups) and `insert` into `contact_messages`,
  but cannot read contact messages back — read those from the Supabase
  dashboard.
- This is a demo/reference build; shipment data is illustrative, not a real
  logistics feed.
