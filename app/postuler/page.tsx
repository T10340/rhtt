import Header from '@/components/Header';

export default function PostulerPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Candidature rapide</h1>
                    <p className="text-gray-600">Remplissez ce formulaire pour postuler. Votre profil sera examiné par nos équipes dans les plus brefs délais.</p>
                </div>

                <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                    {/* Grille Prénom / Nom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input type="text" id="prenom" name="prenom" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                placeholder="Jean" />
                        </div>
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input type="text" id="nom" name="nom" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                placeholder="Dupont" />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" name="email" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                placeholder="jean.dupont@email.com" />
                        </div>
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="tel" id="telephone" name="telephone" required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                placeholder="06 12 34 56 78" />
                        </div>
                    </div>

                    {/* Upload de CV */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Votre CV (PDF, Word)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Télécharger un fichier</span>
                                        <input id="cv-upload" name="cv-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">Moins de 5MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-blue-700 transition-colors active:scale-[0.98] shadow-sm">
                            Envoyer ma candidature
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}