import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Surfaced clearly at request time rather than a silent undefined client.
  console.warn(
    "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export type ShipmentStatus =
  | "booked"
  | "in_transit"
  | "customs"
  | "out_for_delivery"
  | "delivered"
  | "delayed";

export interface Shipment {
  id: string;
  tracking_number: string;
  package_type: string;
  weight_kg: number;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  shipped_at: string;
  estimated_arrival: string;
  carrier: string | null;
  notes: string | null;
}
