'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18">
                    {/* Logo RHTT officiel en WebP */}
                    <Link href="/" onClick={closeMenu} className="shrink-0 flex items-center group py-2">
                        <Image
                            src="/logo.webp"
                            alt="RHTT Intérim & Recrutement"
                            width={140}
                            height={63}
                            priority
                            className="h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                        />
                    </Link>

                    {/* Navigation bureau */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-slate-700 hover:text-rhtt-violet font-semibold transition-colors text-sm">
                            Offres d'emploi
                        </Link>
                        <Link href="/entreprises" className="text-slate-700 hover:text-rhtt-violet font-semibold transition-colors text-sm">
                            Recruter (B2B)
                        </Link>
                        <Link
                            href="/espace-entreprise"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
                        >
                            <svg className="w-3.5 h-3.5 text-rhtt-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Espace Entreprise
                        </Link>
                        <Link
                            href="/contact"
                            className="text-slate-700 hover:text-rhtt-violet font-semibold transition-colors text-sm"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/postuler"
                            className="bg-rhtt-orange hover:bg-rhtt-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            Candidater
                        </Link>
                    </nav>

                    {/* Bouton burger mobile */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Ouvrir le menu"
                            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tiroir déroulant mobile */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl">
                    <nav className="flex flex-col space-y-3">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-rhtt-violet-50 hover:text-rhtt-violet transition-colors"
                        >
                            Offres d'emploi
                        </Link>
                        <Link
                            href="/entreprises"
                            onClick={closeMenu}
                            className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-rhtt-violet-50 hover:text-rhtt-violet transition-colors"
                        >
                            Recruter (Solutions B2B)
                        </Link>
                        <Link
                            href="/espace-entreprise"
                            onClick={closeMenu}
                            className="px-3 py-2.5 rounded-xl text-base font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-between"
                        >
                            <span>Espace Entreprise (Client)</span>
                            <span className="text-xs bg-rhtt-violet text-white px-2 py-0.5 rounded-full">Portail</span>
                        </Link>
                        <Link
                            href="/espace-interimaire"
                            onClick={closeMenu}
                            className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-rhtt-violet-50 hover:text-rhtt-violet transition-colors"
                        >
                            Espace Intérimaire
                        </Link>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-rhtt-violet-50 hover:text-rhtt-violet transition-colors"
                        >
                            Contact
                        </Link>
                        <div className="pt-2">
                            <Link
                                href="/postuler"
                                onClick={closeMenu}
                                className="block w-full text-center bg-rhtt-orange hover:bg-rhtt-orange-600 text-white px-4 py-3 rounded-xl text-base font-bold shadow-sm active:scale-98 transition-colors"
                            >
                                Candidater
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}