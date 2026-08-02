import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const number = request.nextUrl.searchParams.get("number")?.trim().toUpperCase();

  if (!number) {
    return NextResponse.json(
      { error: "Provide a tracking number via ?number=" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("shipments")
    .select(
      "tracking_number, package_type, weight_kg, origin, destination, status, carrier, shipped_at, estimated_arrival, notes"
    )
    .eq("tracking_number", number)
    .maybeSingle();

  if (error) {
    console.error("Supabase error looking up shipment:", error.message);
    return NextResponse.json(
      { error: "Something went wrong while looking up that shipment." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: `No shipment found for tracking number "${number}".` },
      { status: 404 }
    );
  }

  return NextResponse.json({ shipment: data });
}
