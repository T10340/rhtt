import Header from '@/components/Header';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                        Nous contacter
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
                        Une question ? Un projet ?
                    </h1>
                    <p className="text-gray-600 text-base">
                        Notre équipe vous accueille en agence ou répond à vos demandes par téléphone et message.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Bloc Coordonnées & Horaires */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Agence</h3>
                                <p className="font-semibold text-gray-900 text-lg">RHTT Intérim</p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Île-de-France<br />
                                    France
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Coordonnées</h3>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium text-gray-900">Téléphone :</span>{' '}
                                    <a href="tel:0100000000" className="text-blue-600 hover:underline">01 00 00 00 00</a>
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium text-gray-900">Email :</span>{' '}
                                    <a href="mailto:contact@rhtt.fr" className="text-blue-600 hover:underline">contact@rhtt.fr</a>
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Horaires d'ouverture</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex justify-between">
                                        <span>Lundi - Vendredi :</span>
                                        <span className="font-medium text-gray-900">08h30 - 18h00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Samedi - Dimanche :</span>
                                        <span className="text-gray-400">Fermé</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire de message direct */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Envoyez-nous un message</h2>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="contact-nom" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            id="contact-nom"
                                            required
                                            placeholder="Jean Dupont"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-tel" className="block text-sm font-medium text-gray-700 mb-1">
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="contact-tel"
                                            placeholder="06 12 34 56 78"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        required
                                        placeholder="jean@exemple.fr"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-sujet" className="block text-sm font-medium text-gray-700 mb-1">
                                        Objet
                                    </label>
                                    <select
                                        id="contact-sujet"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                                    >
                                        <option>Question sur une offre d'emploi</option>
                                        <option>Demande d'informations entreprise</option>
                                        <option>Candidature spontanée</option>
                                        <option>Autre demande</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={4}
                                        required
                                        placeholder="Votre message ici..."
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm"
                                >
                                    Envoyer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}