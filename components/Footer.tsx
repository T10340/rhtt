import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-900 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Colonne 1 : Marque & Logo */}
                    <div>
                        <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-xl mb-4 shadow-sm hover:opacity-95 transition-opacity">
                            <Image
                                src="/logo.webp"
                                alt="RHTT Intérim & Recrutement"
                                width={130}
                                height={58}
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            L'agence d'intérim qui connecte les meilleurs talents aux entreprises les plus exigeantes en Île-de-France.
                        </p>
                    </div>

                    {/* Colonne 2 : Candidats */}
                    <div>
                        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-rhtt-orange rounded-full inline-block"></span>
                            Candidats
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">Toutes nos offres</Link></li>
                            <li><Link href="/postuler" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">Candidature spontanée</Link></li>
                            <li><Link href="/espace-interimaire" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">Espace Intérimaire (Portail RH)</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Entreprises & Contact */}
                    <div>
                        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-rhtt-violet rounded-full inline-block"></span>
                            Entreprises & Contact
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/entreprises" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">Recruter avec RHTT (Devis)</Link></li>
                            <li><Link href="/espace-entreprise" className="text-rhtt-orange hover:text-rhtt-orange-300 text-sm font-semibold transition-colors">Espace Entreprise (Portail Client)</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">Nous contacter</Link></li>
                            <li><span className="text-slate-400 text-sm block mt-2">📍 Paris & Île-de-France</span></li>
                            <li><a href="mailto:contact@rhtt.fr" className="text-slate-400 hover:text-rhtt-orange text-sm transition-colors">✉️ contact@rhtt.fr</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} RHTT Intérim & Recrutement. Tous droits réservés.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Mentions légales</Link>
                        <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Politique de confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}