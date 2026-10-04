import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Colonne 1 : Marque */}
                    <div>
                        <span className="text-2xl font-black text-white tracking-tighter block mb-4">
                            RHTT<span className="text-blue-500">.</span>
                        </span>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            L'agence d'intérim qui connecte les meilleurs talents aux entreprises les plus exigeantes.
                        </p>
                    </div>

                    {/* Colonne 2 : Candidats */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Candidats</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Toutes nos offres</Link></li>
                            <li><Link href="/postuler" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Candidature spontanée</Link></li>
                            <li><Link href="/espace-interimaire" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Espace Intérimaire (Portail RH)</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Entreprises & Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Entreprises & Contact</h3>
                        <ul className="space-y-2">
                            <li><Link href="/entreprises" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Recruter avec RHTT (Devis)</Link></li>
                            <li><Link href="/espace-entreprise" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">Espace Entreprise (Portail Client)</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Nous contacter</Link></li>
                            <li><span className="text-gray-400 text-sm block mt-4">📍 Paris & Île-de-France</span></li>
                            <li><a href="mailto:contact@rhtt.fr" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">✉️ contact@rhtt.fr</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} RHTT Intérim. Tous droits réservés.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-gray-500 hover:text-white text-xs">Mentions légales</Link>
                        <Link href="#" className="text-gray-500 hover:text-white text-xs">Politique de confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}