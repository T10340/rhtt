'use client';

import Link from 'next/link';
import RhSimulator from './RhSimulator';
import HeroPartners from './HeroPartners';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
            {/* Halos lumineux d'ambiance */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grille principale : Texte & CTA + Simulateur */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* COLONNE GAUCHE */}
                    <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6">
                        
                        {/* 1. Badge Pôle Réactivité */}
                        <div className="flex items-center">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EBF3FF] text-[#0062FF] border border-[#D0E2FF] shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-pulse shrink-0" />
                                
                                {/* Version courte mobile (Image 2) */}
                                <span className="sm:hidden font-bold tracking-wide">
                                    PÔLE RÉACTIVITÉ ENTREPRISES • OUVERT
                                </span>
                                
                                {/* Version complète desktop (Image 1) */}
                                <span className="hidden sm:inline-flex items-center gap-1.5 font-bold tracking-wide">
                                    <span>PÔLE RÉACTIVITÉ ENTREPRISES • OUVERT EN DIRECT</span>
                                    <span className="text-blue-300 font-normal">|</span>
                                    <span className="text-slate-600 font-normal">Délai moyen de prise en charge : 14 min</span>
                                </span>
                            </div>
                        </div>

                        {/* 2. Titre Principal H1 */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 leading-[1.12]">
                            Trouvez les talents qui font avancer vos équipes en{' '}
                            <span className="text-[#0062FF]">moins de 24h</span>
                            <span className="hidden sm:inline text-[#0062FF]">.</span>
                        </h1>

                        {/* 3. Description / Sous-titre */}
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                            L'intérim agile et rigoureux : vivier de professionnels qualifiés en BTP, Logistique,
                            Industrie et Tertiaire avec conformité juridique 100% garantie et réactivité immédiate.
                        </p>

                        {/* 4. Groupe de boutons d'action (CTA) */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                            {/* Bouton principal : Déposer une offre */}
                            <Link
                                href="/entreprises"
                                className="w-full sm:w-auto px-6 py-3.5 bg-[#0062FF] hover:bg-[#0052D9] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-blue-500/20 text-center active:scale-98 flex items-center justify-center gap-2.5"
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span>Déposer une offre d'emploi</span>
                            </Link>

                            {/* Bouton secondaire : Être rappelé sous 30 minutes */}
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-semibold text-sm rounded-xl transition-all shadow-xs text-center active:scale-98 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4 text-[#0062FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span>
                                    <span className="sm:hidden">Être rappelé sous 30 minutes</span>
                                    <span className="hidden sm:inline">Être rappelé sous 30 min</span>
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-[#0062FF]">
                                    Gratuit
                                </span>
                            </Link>

                            {/* Téléphone direct (Desktop) */}
                            <div className="hidden xl:flex items-center gap-2 pl-2">
                                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0062FF] shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <a
                                    href="tel:0142680090"
                                    className="text-xs font-black text-slate-800 hover:text-[#0062FF] transition-colors leading-tight"
                                >
                                    01 42 68 00 90
                                </a>
                            </div>
                        </div>

                        {/* 5.A. VERSION MOBILE : Carte indicateurs en temps réel (Image 2) */}
                        <div className="lg:hidden pt-1">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-4 shadow-xs">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        INDICATEURS DE PERFORMANCE EN TEMPS RÉEL
                                    </span>
                                    <span className="text-xs font-bold text-[#0062FF] flex items-center gap-1">
                                        <span>⚡</span>
                                        <span>Actif</span>
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-[#f0f6ff] rounded-xl p-2.5 border border-blue-100/60">
                                        <span className="block text-xl font-black text-[#0062FF]">98%</span>
                                        <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">
                                            Pourvus sous 24h
                                        </span>
                                    </div>
                                    <div className="bg-[#f0f6ff] rounded-xl p-2.5 border border-blue-100/60">
                                        <span className="block text-xl font-black text-slate-900">+12k</span>
                                        <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">
                                            Intérimaires certifiés
                                        </span>
                                    </div>
                                    <div className="bg-[#f0f6ff] rounded-xl p-2.5 border border-blue-100/60">
                                        <span className="block text-xl font-black text-slate-900">4.9 ★</span>
                                        <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">
                                            Satisfaction RH
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5.A.BIS : Sur mobile, afficher le ruban partenaires directement sous les indicateurs (Image 2) */}
                        <div className="lg:hidden pt-2">
                            <HeroPartners />
                        </div>

                        {/* 5.B. VERSION DESKTOP : 3 cartes de confiance indépendantes (Image 1) */}
                        <div className="hidden lg:grid grid-cols-3 gap-3.5 pt-4">
                            {/* Carte 1 : Réactivité */}
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        RÉACTIVITÉ
                                    </span>
                                    <span className="text-sm text-[#0062FF]">⚡</span>
                                </div>
                                <span className="block text-2xl font-black text-slate-900">98%</span>
                                <span className="text-xs text-slate-500 leading-tight block mt-1">
                                    Postes pourvus sous 24h
                                </span>
                            </div>

                            {/* Carte 2 : Vivier Actif */}
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        VIVIER ACTIF
                                    </span>
                                    <span className="text-sm text-[#0062FF]">
                                        <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <span className="block text-2xl font-black text-slate-900">+12k</span>
                                <span className="text-xs text-slate-500 leading-tight block mt-1">
                                    Intérimaires qualifiés & audités
                                </span>
                            </div>

                            {/* Carte 3 : Qualité RH */}
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        QUALITÉ RH
                                    </span>
                                    <span className="text-sm text-[#0062FF]">★</span>
                                </div>
                                <span className="block text-2xl font-black text-slate-900">
                                    4.9 <span className="text-base text-slate-400 font-semibold">/5</span>
                                </span>
                                <span className="text-xs text-slate-500 leading-tight block mt-1">
                                    Satisfaction employeurs
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* COLONNE DROITE : Simulateur RH Instantané */}
                    <div className="lg:col-span-5 pt-4 lg:pt-0">
                        <RhSimulator />
                    </div>

                </div>

                {/* Ruban des partenaires sur Desktop (Pleine largeur) */}
                <div className="hidden lg:block mt-12 pt-6 border-t border-slate-200/60">
                    <HeroPartners />
                </div>
            </div>
        </section>
    );
}
