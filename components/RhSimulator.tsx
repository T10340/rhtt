'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RoleOption {
    id: string;
    label: string;
    icon: string;
    workerName: string;
    workerRole: string;
    workerAvailability: string;
    baseCandidates: number;
    delay: string;
}

const ROLES: RoleOption[] = [
    {
        id: 'cariste',
        label: 'Cariste CACES 1-3-5',
        icon: '🚜',
        workerName: 'Karim D.',
        workerRole: 'Préparateur CACES 1 • 6 ans d\'ex...',
        workerAvailability: 'Disponible dès lundi 06h',
        baseCandidates: 18,
        delay: '< 18h',
    },
    {
        id: 'coffreur',
        label: 'Coffreur / Bancheur',
        icon: '🛠',
        workerName: 'Mamadou T.',
        workerRole: 'Bancheur N3P2 • 8 ans d\'ex...',
        workerAvailability: 'Disponible sous 24h',
        baseCandidates: 14,
        delay: '< 24h',
    },
    {
        id: 'electromec',
        label: 'Électromécanicien',
        icon: '⚡',
        workerName: 'Thomas L.',
        workerRole: 'Électroméc. N4 • 5 ans d\'ex...',
        workerAvailability: 'Disponible sous 48h',
        baseCandidates: 9,
        delay: '< 24h',
    },
    {
        id: 'comptable',
        label: 'Comptable Général',
        icon: '💼',
        workerName: 'Sophie M.',
        workerRole: 'Comptable Unique • 7 ans d\'ex...',
        workerAvailability: 'Disponible immédiatement',
        baseCandidates: 12,
        delay: '< 48h',
    },
];

export default function RhSimulator() {
    const [selectedRoleId, setSelectedRoleId] = useState<string>('cariste');
    const [operatorCount, setOperatorCount] = useState<number>(3);

    const activeRole = ROLES.find((r) => r.id === selectedRoleId) || ROLES[0];
    const estimatedCandidates = Math.max(3, activeRole.baseCandidates - Math.floor(operatorCount * 0.4));

    return (
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Carte principale du simulateur */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-blue-500/10 border border-slate-100 relative z-10 transition-all">
                {/* Header du simulateur */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <span className="text-[11px] font-bold tracking-wider text-[#0062FF] uppercase block mb-1">
                            SIMULATEUR INSTANTANÉ
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                            Estimez votre besoin RH
                        </h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0062FF] shrink-0 shadow-xs">
                        {/* Speedometer / Gauge icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Étape 1 : Métier ou spécialité requise */}
                <div className="mb-5">
                    <label className="block text-xs font-bold text-slate-700 mb-2.5">
                        1. Métier ou spécialité requise
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ROLES.map((role) => {
                            const isSelected = role.id === selectedRoleId;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-blue-50/90 text-[#0062FF] border-2 border-[#0062FF] shadow-xs'
                                            : 'bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 border border-slate-200/80'
                                    }`}
                                >
                                    <span className="text-sm shrink-0">{role.icon}</span>
                                    <span className="truncate">{role.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Étape 2 : Nombre d'opérateurs */}
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700">Nombre d'opérateurs</span>
                        <span className="text-sm sm:text-base font-black text-[#0062FF]">
                            {operatorCount} {operatorCount > 1 ? 'profils' : 'profil'}
                        </span>
                    </div>

                    {/* Range slider personnalisé */}
                    <div className="relative py-1">
                        <input
                            type="range"
                            min="1"
                            max="25"
                            value={operatorCount}
                            onChange={(e) => setOperatorCount(Number(e.target.value))}
                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-[#0062FF]"
                            aria-label="Nombre d'opérateurs"
                        />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                        <span>1 personne</span>
                        <span>Équipe complète (25+)</span>
                    </div>
                </div>

                {/* Bandeau Disponibilité sombre */}
                <div className="bg-[#0f172a] text-white rounded-xl p-3.5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner">
                    <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">
                            DISPONIBILITÉ DANS VOTRE ZONE
                        </span>
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-white">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{estimatedCandidates} candidats pré-qualifiés</span>
                        </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                            DÉLAI D'AFFECTATION {activeRole.delay}
                        </span>
                    </div>
                </div>

                {/* Bouton CTA Réserver */}
                <Link
                    href={`/entreprises?poste=${encodeURIComponent(activeRole.label)}&quantite=${operatorCount}`}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0062FF] hover:bg-[#0052D9] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-98 transition-all"
                >
                    <span>Réserver ces disponibilités</span>
                    <span className="text-lg leading-none">→</span>
                </Link>
            </div>

            {/* Carte flottante du candidat et mention de réassurance */}
            <div className="relative mt-3 sm:mt-0">
                {/* Floating profile badge */}
                <div className="sm:absolute sm:-bottom-7 sm:-left-5 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-slate-100 flex items-center gap-3 max-w-[290px]">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                        <Image
                            src="/worker-karim.jpg"
                            alt={activeRole.workerName}
                            fill
                            className="object-cover"
                            sizes="44px"
                        />
                    </div>
                    <div className="min-w-0 pr-1">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900 truncate">
                                {activeRole.workerName}
                            </span>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0062FF] text-white flex items-center justify-center text-[9px] font-black shrink-0">
                                ✓
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate leading-tight">
                            {activeRole.workerRole}
                        </p>
                        <p className="text-[10px] text-[#0062FF] font-semibold flex items-center gap-1 mt-0.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF]"></span>
                            {activeRole.workerAvailability}
                        </p>
                    </div>
                </div>

                {/* Mention RHTT contrôlée en continu */}
                <div className="hidden sm:flex items-center justify-end gap-1.5 pt-3 pr-2 text-slate-400 text-xs">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>
                    <span>RHTT contrôlée en continu</span>
                </div>
            </div>
        </div>
    );
}
