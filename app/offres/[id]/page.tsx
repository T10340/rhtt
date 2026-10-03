import Header from '@/components/Header';
import Link from 'next/link';

export default function JobDetailsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8">

                {/* En-tête de l'annonce */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Intérim - 3 mois</span>
                        <span className="text-gray-500 text-sm">Publié il y a 2 jours</span>
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
                        Cariste CACES 3 (H/F)
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-medium border-t border-gray-100 pt-4 mt-2">
                        <div className="flex items-center gap-1">
                            📍 Pontault-Combault (77)
                        </div>
                        <div className="flex items-center gap-1">
                            💶 11.65€ - 12.50€ /h
                        </div>
                        <div className="flex items-center gap-1">
                            ⏰ 35h - Travail en équipe (2x8)
                        </div>
                    </div>
                </div>

                {/* Corps de l'annonce */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">La mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Pour le compte de notre client, un acteur majeur de la logistique, nous recherchons un(e) Cariste CACES 3 expérimenté(e). Au sein d'un entrepôt mécanisé, vous serez en charge de l'optimisation du stockage et de la préparation des expéditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Vos responsabilités</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Chargement et déchargement des camions dans le respect des règles de sécurité.</li>
                            <li>Gerbage en hauteur (jusqu'à 10 mètres).</li>
                            <li>Approvisionnement des zones de préparation de commandes (picking).</li>
                            <li>Contrôle qualitatif et quantitatif des marchandises.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Votre profil</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>CACES R489 Catégorie 3 en cours de validité obligatoire.</li>
                            <li>Une première expérience réussie d'au moins 1 an sur un poste similaire.</li>
                            <li>Rigueur, ponctualité et esprit d'équipe.</li>
                        </ul>
                    </section>
                </div>
            </main>

            {/* Barre d'action fixe sur Mobile (Sticky Footer) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                <Link href="/postuler" className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-blue-700 active:scale-95 transition-all">
                    Postuler maintenant
                </Link>
            </div>

            {/* Bouton d'action standard sur Desktop */}
            <div className="hidden md:block max-w-3xl mx-auto w-full px-4 mb-12">
                <Link href="/postuler" className="inline-block w-full text-center bg-blue-600 text-white px-4 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                    Postuler à cette offre
                </Link>
            </div>
        </div>
    );
}