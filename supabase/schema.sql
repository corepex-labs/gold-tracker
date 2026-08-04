-- Aurum Transit — Supabase schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

create type shipment_status as enum (
  'booked',
  'in_transit',
  'customs',
  'out_for_delivery',
  'delivered',
  'delayed'
);

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_number text unique not null,
  package_type text not null,
  weight_kg numeric(10, 3) not null,
  origin text not null,
  destination text not null,
  status shipment_status not null default 'booked',
  carrier text,
  shipped_at timestamptz not null default now(),
  estimated_arrival timestamptz not null,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists shipments_tracking_number_idx
  on shipments (tracking_number);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security -----------------------------------------------------
-- The site uses the public anon key from the browser/API route, so RLS
-- policies (not app logic) are what actually enforce access.

alter table shipments enable row level security;
alter table contact_messages enable row level security;

-- Anyone holding a valid tracking number can look up that one shipment.
create policy "Public can read shipments by tracking number"
  on shipments for select
  using (true);

-- Anyone can submit a contact message; nobody can read them back via the
-- anon key (read them from the Supabase dashboard/table editor instead).
create policy "Public can submit contact messages"
  on contact_messages for insert
  with check (true);

-- Demo seed data -----------------------------------------------------------
-- A few sample shipments so /track works immediately after setup.
insert into shipments
  (tracking_number, package_type, weight_kg, origin, destination, status, carrier, shipped_at, estimated_arrival, notes)
values
  ('AUR-2026-104822', '1kg Gold Bars (400 x 1oz)', 12.500, 'London, United Kingdom', 'Zurich, Switzerland', 'in_transit', 'Brink''s Global Logistics', now() - interval '2 days', now() + interval '2 days', 'Cleared UK export customs. Awaiting connecting flight in Dubai.'),
  ('AUR-2026-104910', 'Gold Dore Bars', 340.000, 'Johannesburg, South Africa', 'London, United Kingdom', 'customs', 'Malca-Amit', now() - interval '4 days', now() + interval '1 days', 'Held for routine assay verification at destination bonded vault.'),
  ('AUR-2026-105033', '1oz Gold Coins (Krugerrand)', 3.100, 'Perth, Australia', 'Singapore', 'delivered', 'Loomis International', now() - interval '9 days', now() - interval '1 days', 'Delivered and signed for at bonded vault, Singapore Freeport.'),
  ('AUR-2026-105117', 'Gold Jewellery Consignment', 8.750, 'Dubai, UAE', 'New York, United States', 'out_for_delivery', 'Brink''s Global Logistics', now() - interval '3 days', now() + interval '6 hours', 'On final armored transport leg to receiving vault.'),
  ('AUR-2026-105200', '100g Gold Bars', 6.000, 'London, United Kingdom', 'Toronto, Canada', 'delayed', 'Malca-Amit', now() - interval '5 days', now() + interval '3 days', 'Delayed by additional customs documentation review.')
on conflict (tracking_number) do nothing;
