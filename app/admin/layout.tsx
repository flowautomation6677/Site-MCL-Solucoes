import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Painel Admin | MCL Soluções",
    robots: { index: false, follow: false },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A1D3A]">
            {/* Top bar */}
            <header className="border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#A67A5B] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <span className="text-white font-semibold text-lg tracking-tight">
                            MCL Soluções
                        </span>
                    </div>
                    <span className="text-white/30 mx-1">/</span>
                    <span className="text-[#A67A5B] text-sm font-medium">Painel Admin</span>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
        </div>
    );
}
