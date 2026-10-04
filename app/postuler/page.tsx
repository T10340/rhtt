import Header from '@/components/Header';
import Link from 'next/link';

export default function PostulerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Candidature rapide
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Postulez en un instant ou connectez-vous pour réutiliser vos informations enregistrées.
          </p>
        </div>

        {/* Bloc d'authentification / Inscription rapide */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <p className="text-sm font-semibold text-gray-800 text-center sm:text-left">
            Gagnez du temps sur vos futures candidatures :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Bouton Google */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors active:scale-[0.99] shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.07.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.39 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.43l4.03-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>Continuer avec Google</span>
            </button>

            {/* Bouton Créer un compte */}
            <Link
              href="/inscription"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-sm transition-colors text-center active:scale-[0.99] shadow-2xs"
            >
              <span>Créer un compte candidat</span>
            </Link>
          </div>

          <div className="relative py-2 flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-xs text-gray-400 uppercase font-semibold absolute tracking-wider">
              ou continuer sans compte
            </span>
          </div>
        </div>

        {/* Formulaire invité */}
        <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          {/* Grille Prénom / Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                placeholder="Jean"
              />
            </div>
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                placeholder="Dupont"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                placeholder="jean.dupont@email.com"
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          {/* Upload de CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Votre CV (PDF, Word)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="cv-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Télécharger un fichier</span>
                    <input
                      id="cv-upload"
                      name="cv-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Moins de 5 Mo</p>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-blue-700 transition-colors active:scale-[0.98] shadow-sm"
            >
              Envoyer ma candidature
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}