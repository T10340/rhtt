import Header from '@/components/Header';

export default function EntreprisesPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
                {/* Hero Section B2B */}
                <section className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                        Solutions RH sur-mesure
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Recrutez les bons profils, <br className="hidden sm:block" />
                        <span className="text-blue-600">sans perdre de temps.</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        RHTT Intérim vous accompagne pour vos besoins urgents, pics d'activité et recrutements stratégiques en Île-de-France.
                    </p>
                </section>

                {/* 3 Avantages clés */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-2">⚡</div>
                        <h3 className="font-bold text-gray-900 mb-1">Réactivité 24/48h</h3>
                        <p className="text-gray-500 text-sm">Délégation rapide de candidats qualifiés et immédiatement opérationnels.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-2">🎯</div>
                        <h3 className="font-bold text-gray-900 mb-1">Ciblage précis</h3>
                        <p className="text-gray-500 text-sm">Contrôle systématique des compétences, habilitations (CACES) et références.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-2xl mb-2">📋</div>
                        <h3 className="font-bold text-gray-900 mb-1">Gestion intégrale</h3>
                        <p className="text-gray-500 text-sm">Contrats, paie, déclarations : nous prenons en charge toute la partie administrative.</p>
                    </div>
                </section>

                {/* Formulaire de demande de devis */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Exprimez votre besoin</h2>
                    <p className="text-gray-600 text-sm mb-6">Décrivez votre recherche et recevez une proposition adaptée sous 24h ouvrées.</p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Raison sociale (Entreprise)</label>
                                <input type="text" id="company" name="company" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    placeholder="Ex : Logistique Express SAS" />
                            </div>
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Nom et prénom du contact</label>
                                <input type="text" id="contactName" name="contactName" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    placeholder="Jean Dupont" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                                <input type="email" id="email" name="email" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    placeholder="contact@entreprise.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <input type="tel" id="phone" name="phone" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    placeholder="01 23 45 67 89" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Poste recherché</label>
                                <input type="text" id="role" name="role" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    placeholder="Ex : Cariste, Manutentionnaire..." />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Nombre de postes</label>
                                <input type="number" id="quantity" name="quantity" min="1" defaultValue="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Précisions (durée, horaires, lieu précis)</label>
                            <textarea id="details" name="details" rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                placeholder="Mission de 2 mois à pourvoir dès lundi prochain à Pontault-Combault, travail en 2x8..."></textarea>
                        </div>

                        <button type="submit"
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
                            Demander un devis
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}