import Link from 'next/link';

interface Partner {
    name: string;
    prefix: string;
    prefixBg: string;
    prefixColor: string;
}

const PARTNERS: Partner[] = [
    {
        name: 'VINCI Const.',
        prefix: 'VIN',
        prefixBg: 'bg-black',
        prefixColor: 'text-white',
    },
    {
        name: 'Kuehne+Nagel',
        prefix: 'K+N',
        prefixBg: 'bg-[#0062FF]',
        prefixColor: 'text-white',
    },
    {
        name: 'Saint-Gobain',
        prefix: 'SAI',
        prefixBg: 'bg-[#0F1E36]',
        prefixColor: 'text-white',
    },
    {
        name: 'Eiffage',
        prefix: 'EIF',
        prefixBg: 'bg-slate-900',
        prefixColor: 'text-white',
    },
    {
        name: 'Bouygues Const.',
        prefix: 'BYCN',
        prefixBg: 'bg-amber-600',
        prefixColor: 'text-white',
    },
];

export default function HeroPartners() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3.5 gap-2">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase">
                    PLUS DE 450 ENTREPRISES PARTENAIRES AU QUOTIDIEN
                </span>
                <Link
                    href="/entreprises#qualite"
                    className="text-[11px] sm:text-xs font-bold text-[#0062FF] hover:underline shrink-0"
                >
                    Audit ISO 9001
                </Link>
            </div>

            {/* Rangée de badges partenaires blancs avec logo miniature (conforme à la maquette) */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {PARTNERS.map((partner) => (
                    <div
                        key={partner.name}
                        className="shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                        <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight shrink-0 shadow-xs ${partner.prefixBg} ${partner.prefixColor}`}
                        >
                            {partner.prefix}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight whitespace-nowrap">
                            {partner.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
