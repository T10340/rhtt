'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" onClick={closeMenu} className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-black text-blue-700 tracking-tighter">
                            RHTT<span className="text-gray-900">.</span>
                        </span>
                    </Link>

                    {/* Navigation bureau */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Offres d'emploi
                        </Link>
                        <Link href="/entreprises" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Espace Entreprise
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/postuler"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
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
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
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
                <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-lg">
                    <nav className="flex flex-col space-y-3">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            Offres d'emploi
                        </Link>
                        <Link
                            href="/entreprises"
                            onClick={closeMenu}
                            className="px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            Espace Entreprise
                        </Link>
                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            Contact
                        </Link>
                        <div className="pt-2">
                            <Link
                                href="/postuler"
                                onClick={closeMenu}
                                className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-blue-700 transition-colors"
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