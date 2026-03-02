import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL ?? "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY ?? "";
const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME ?? "mcl-whatsapp";

async function evolutionFetch(path: string, options: RequestInit = {}) {
    const res = await fetch(`${EVOLUTION_API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            apikey: EVOLUTION_API_KEY,
            ...(options.headers ?? {}),
        },
    });
    return res;
}

async function ensureInstanceExists() {
    // Check if the instance already exists
    const listRes = await evolutionFetch(`/instance/fetchInstances`);
    const instances: Array<{ instance: { instanceName: string } }> = await listRes.json();
    const exists = instances.some(
        (i) => i.instance?.instanceName === INSTANCE_NAME
    );

    if (!exists) {
        await evolutionFetch("/instance/create", {
            method: "POST",
            body: JSON.stringify({
                instanceName: INSTANCE_NAME,
                qrcode: true,
                integration: "WHATSAPP-BAILEYS",
            }),
        });
    }
}

export async function GET() {
    if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
        return NextResponse.json(
            { error: "Evolution API not configured. Check .env.local variables." },
            { status: 500 }
        );
    }

    try {
        await ensureInstanceExists();

        const connectRes = await evolutionFetch(
            `/instance/connect/${INSTANCE_NAME}`
        );

        if (!connectRes.ok) {
            const body = await connectRes.text();
            return NextResponse.json(
                { error: `Evolution API error: ${body}` },
                { status: connectRes.status }
            );
        }

        const data = await connectRes.json();

        // data.base64 contains the QR code as a Base64 data URI
        return NextResponse.json({ qrcode: data.base64 ?? null, code: data.code ?? null });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
