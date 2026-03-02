"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type ConnectionState =
    | "idle"
    | "loading"
    | "qrcode"
    | "connected"
    | "error";

const QR_EXPIRY_SECONDS = 60;

function StatusBadge({ state }: { state: ConnectionState }) {
    const map: Record<ConnectionState, { label: string; color: string }> = {
        idle: { label: "Desconectado", color: "bg-white/10 text-white/50" },
        loading: { label: "Conectando...", color: "bg-amber-500/20 text-amber-400" },
        qrcode: { label: "Aguardando leitura", color: "bg-amber-500/20 text-amber-400" },
        connected: { label: "Conectado", color: "bg-emerald-500/20 text-emerald-400" },
        error: { label: "Erro", color: "bg-red-500/20 text-red-400" },
    };
    const { label, color } = map[state];
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${color}`}
        >
            <span
                className={`w-2 h-2 rounded-full ${state === "connected"
                    ? "bg-emerald-400 animate-pulse"
                    : state === "qrcode" || state === "loading"
                        ? "bg-amber-400 animate-pulse"
                        : state === "error"
                            ? "bg-red-400"
                            : "bg-white/30"
                    }`}
            />
            {label}
        </span>
    );
}

function Spinner() {
    return (
        <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#A67A5B] animate-spin" />
            <p className="text-white/50 text-sm">Gerando QR Code...</p>
        </div>
    );
}

function QRTimer({ seconds }: { seconds: number }) {
    const pct = (seconds / QR_EXPIRY_SECONDS) * 100;
    const isUrgent = seconds <= 15;
    return (
        <div className="w-full mt-4 space-y-2">
            <div className="flex justify-between text-xs text-white/40">
                <span>QR Code expira em</span>
                <span className={isUrgent ? "text-red-400 font-semibold" : "text-white/60"}>
                    {seconds}s
                </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-red-500" : "bg-[#A67A5B]"
                        }`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default function WhatsAppPage() {
    const [state, setState] = useState<ConnectionState>("idle");
    const [qrSrc, setQrSrc] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [timer, setTimer] = useState(QR_EXPIRY_SECONDS);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearAllTimers = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (pollRef.current) clearInterval(pollRef.current);
    };

    const checkStatus = useCallback(async () => {
        const res = await fetch("/api/whatsapp/status", { cache: "no-store" });
        const data = await res.json();
        if (data.state === "open") {
            setState("connected");
            setQrSrc(null);
            clearAllTimers();
        }
    }, []);

    const startPolling = useCallback(() => {
        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = setInterval(checkStatus, 3000);
    }, [checkStatus]);

    const startQrTimer = useCallback(() => {
        setTimer(QR_EXPIRY_SECONDS);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) {
                    clearAllTimers();
                    setState("idle");
                    setQrSrc(null);
                    return QR_EXPIRY_SECONDS;
                }
                return t - 1;
            });
        }, 1000);
    }, []);

    const fetchQr = useCallback(async () => {
        clearAllTimers();
        setState("loading");
        setQrSrc(null);
        setErrorMsg("");

        try {
            const res = await fetch("/api/whatsapp/connect", { cache: "no-store" });
            const data = await res.json();

            if (!res.ok || data.error) {
                setErrorMsg(data.error ?? "Erro ao conectar com a API.");
                setState("error");
                return;
            }

            if (data.qrcode) {
                // Already a data URI or raw base64
                const src = data.qrcode.startsWith("data:")
                    ? data.qrcode
                    : `data:image/png;base64,${data.qrcode}`;
                setQrSrc(src);
                setState("qrcode");
                startQrTimer();
                startPolling();
            } else {
                // No QR returned — instance already connected
                setState("connected");
            }
        } catch (err) {
            setErrorMsg(
                err instanceof Error ? err.message : "Falha na requisição."
            );
            setState("error");
        }
    }, [startQrTimer, startPolling]);

    // Check status on mount
    useEffect(() => {
        checkStatus();
        return clearAllTimers;
    }, [checkStatus]);

    return (
        <div className="min-h-[80vh] flex items-start justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-1">
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            WhatsApp
                        </h1>
                        <StatusBadge state={state} />
                    </div>
                    <p className="text-white/40 text-sm">
                        Conecte o número principal da MCL Soluções via QR Code.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden">
                    <div className="p-6">
                        {/* Connected State */}
                        {state === "connected" && (
                            <div className="flex flex-col items-center gap-4 py-10">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-semibold text-lg">Conectado!</p>
                                    <p className="text-white/40 text-sm mt-1">
                                        O WhatsApp está ativo e pronto para receber mensagens.
                                    </p>
                                </div>
                                <button
                                    onClick={fetchQr}
                                    className="mt-2 text-xs text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors"
                                >
                                    Reconectar com outro número
                                </button>
                            </div>
                        )}

                        {/* Idle State */}
                        {state === "idle" && (
                            <div className="flex flex-col items-center gap-6 py-8">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white/20"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-white/60 text-sm">
                                        Clique abaixo para gerar o QR Code e conectar seu WhatsApp.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {state === "loading" && <Spinner />}

                        {/* QR Code State */}
                        {state === "qrcode" && qrSrc && (
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-white/50 text-sm">
                                    Abra o WhatsApp no celular e escaneie o código abaixo.
                                </p>
                                <div className="p-3 bg-white rounded-xl shadow-lg shadow-black/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={qrSrc}
                                        alt="QR Code de conexão do WhatsApp"
                                        className="w-56 h-56 object-contain"
                                    />
                                </div>
                                <QRTimer seconds={timer} />
                            </div>
                        )}

                        {/* Error State */}
                        {state === "error" && (
                            <div className="flex flex-col items-center gap-4 py-8">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-red-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-semibold">Falha na conexão</p>
                                    <p className="text-red-400/80 text-xs mt-1 max-w-xs leading-relaxed">
                                        {errorMsg}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer action */}
                    {state !== "connected" && (
                        <div className="px-6 pb-6">
                            <button
                                id="btn-connect-whatsapp"
                                onClick={fetchQr}
                                disabled={state === "loading"}
                                className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  bg-[#A67A5B] text-white hover:bg-[#b8896a] active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                  shadow-lg shadow-[#A67A5B]/20"
                            >
                                {state === "loading"
                                    ? "Aguardando..."
                                    : state === "qrcode"
                                        ? "↻ Gerar novo QR Code"
                                        : state === "error"
                                            ? "Tentar novamente"
                                            : "Conectar WhatsApp"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Help */}
                <div className="mt-6 rounded-xl border border-white/5 bg-white/2 p-4 space-y-2">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                        Como conectar
                    </p>
                    {[
                        'Clique em "Conectar WhatsApp"',
                        "Abra o WhatsApp no celular → ⋮ → Dispositivos conectados",
                        'Toque em "Conectar dispositivo"',
                        "Aponte a câmera para o QR Code acima",
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#A67A5B]/20 flex items-center justify-center text-[#A67A5B] text-[10px] font-bold shrink-0">
                                {i + 1}
                            </span>
                            <p className="text-white/40 text-xs leading-relaxed">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
