import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL ?? "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY ?? "";
const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME ?? "mcl-whatsapp";

export async function GET() {
    if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
        return NextResponse.json({ state: "unconfigured" });
    }

    try {
        const res = await fetch(
            `${EVOLUTION_API_URL}/instance/connectionState/${INSTANCE_NAME}`,
            {
                headers: {
                    apikey: EVOLUTION_API_KEY,
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            return NextResponse.json({ state: "disconnected" });
        }

        const data = await res.json();
        // Evolution returns: { instance: { state: "open" | "close" | "connecting" } }
        const state: string = data?.instance?.state ?? data?.state ?? "disconnected";
        return NextResponse.json({ state });
    } catch {
        return NextResponse.json({ state: "disconnected" });
    }
}
