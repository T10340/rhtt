import Header from '@/components/Header';
import JobList from '@/components/JobList';
import { getJobs } from '@/lib/wordpress';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24">
        {/* Halo décoratif discret */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Agence d'emploi & travail temporaire en Île-de-France
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            L'humain au cœur de vos <span className="text-blue-500">missions RH</span>.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Spécialiste du recrutement temporaire et permanent dans le BTP, le transport, la logistique et le tertiaire. Réactivité, proximité et engagement terrain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#offres"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-center"
            >
              Consulter nos offres
            </a>
            <Link
              href="/entreprises"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition-all text-center"
            >
              Vous êtes une entreprise ?
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DE STATS / PREUVES SOCIALES */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-slate-900">+25 ans</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">D'expérience terrain</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-blue-600">24h</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Délai de réactivité</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-slate-900">10 000+</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Missions déléguées</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-slate-900">98%</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Clients fidélisés</span>
          </div>
        </div>
      </section>

      {/* 3. DOUBLE ACCÈS CIBLÉ (CANDIDATS VS CLIENTS) */}
      <section className="max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte Candidat */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Espace Candidats
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Trouvez votre prochaine mission</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Des missions sélectionnées adaptées à vos qualifications avec un accompagnement administratif transparent et une rémunération sécurisée.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li className="flex items-center gap-2">✓ Acomptes hebdomadaires sur demande</li>
                <li className="flex items-center gap-2">✓ Suivi personnalisé par un référent unique</li>
                <li className="flex items-center gap-2">✓ Missions régulières et tremplins CDI</li>
              </ul>
            </div>
            <a
              href="#offres"
              className="block w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Voir les postes disponibles
            </a>
          </div>

          {/* Carte Entreprise */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Espace Entreprises
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Déléguez vos recrutements urgents</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pic d’activité, arrêt imprévu ou recherche d'un profil spécialisé : notre vivier d'intérimaires qualifiés est opérationnel immédiatement.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li className="flex items-center gap-2">✓ Vérification rigoureuse des habilitations (CACES, etc.)</li>
                <li className="flex items-center gap-2">✓ Prise en charge 100% juridique et DSN</li>
                <li className="flex items-center gap-2">✓ Interlocuteur dédié sans centrale d'appels</li>
              </ul>
            </div>
            <Link
              href="/entreprises"
              className="block w-full py-3 text-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Demander un devis / renfort
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTEURS D'ACTIVITÉ */}
      <section className="bg-slate-100/70 border-t border-slate-200 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Nos domaines d'intervention</h2>
            <p className="text-sm text-slate-600">Des profils ciblés pour répondre aux exigences techniques de chaque secteur.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bâtiment & TP', desc: 'Maçons, électriciens, coffreurs, manœuvres' },
              { label: 'Transport & Logistique', desc: 'Caristes 1-3-5, préparateurs de commandes, chauffeurs' },
              { label: 'Tertiaire & Services', desc: 'Comptabilité, administration des ventes, accueil' },
              { label: 'Industrie & Maintenance', desc: 'Techniciens de maintenance, opérateurs de ligne' },
            ].map((sector) => (
              <div key={sector.label} className="bg-white p-5 rounded-xl border border-slate-200 text-left shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{sector.label}</h3>
                <p className="text-xs text-slate-500 leading-normal">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LISTE DYNAMIQUE DES OFFRES (Le moteur actuel) */}
      <section id="offres" className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full scroll-mt-6">
        <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Offres à pourvoir</h2>
            <p className="text-sm text-slate-500">Postulez directement en ligne ou contactez notre agence.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-200 text-slate-700 rounded-full w-fit">
            {jobs.length} offre{jobs.length > 1 ? 's' : ''} active{jobs.length > 1 ? 's' : ''}
          </span>
        </div>

        <JobList initialJobs={jobs} />
      </section>

      {/* 6. PIED DE PAGE BASIQUE */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-xs text-center">
        <p>© {new Date().getFullYear()} RHTT Intérim. Tous droits réservés.</p>
      </footer>
    </div>
  );
}