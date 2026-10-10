import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JobList from '@/components/JobList';
import Footer from '@/components/Footer';
import { getJobs } from '@/lib/wordpress';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* 1. NOUVEAU HERO SECTION CONFORME AUX MOCKUPS (MOBILE-FIRST) */}
      <HeroSection />

      {/* 2. DOUBLE ACCÈS CIBLÉ (CANDIDATS VS CLIENTS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Carte Candidat */}
          <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 hover:border-[#0062FF]/40 shadow-xs hover:shadow-md flex flex-col justify-between space-y-6 transition-all">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-50 text-[#0062FF] border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                Espace Candidats
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Trouvez votre prochaine mission
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Des missions sélectionnées adaptées à vos qualifications avec un accompagnement administratif transparent et une rémunération sécurisée.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#0062FF] font-bold">✓</span> Acomptes hebdomadaires sur demande
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0062FF] font-bold">✓</span> Suivi personnalisé par un référent unique
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0062FF] font-bold">✓</span> Missions régulières et tremplins CDI
                </li>
              </ul>
            </div>
            <a
              href="#offres"
              className="block w-full py-3.5 text-center bg-[#0062FF] hover:bg-[#0052D9] text-white font-bold rounded-xl transition-colors text-sm shadow-sm active:scale-98"
            >
              Voir les postes disponibles
            </a>
          </div>

          {/* Carte Entreprise */}
          <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 hover:border-slate-400 shadow-xs hover:shadow-md flex flex-col justify-between space-y-6 transition-all">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-800 border border-slate-300 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                Espace Entreprises
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Déléguez vos recrutements urgents
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pic d’activité, arrêt imprévu ou recherche d'un profil spécialisé : notre vivier d'intérimaires qualifiés est opérationnel immédiatement.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-slate-900 font-bold">✓</span> Vérification rigoureuse des habilitations (CACES, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-slate-900 font-bold">✓</span> Prise en charge 100% juridique et DSN
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-slate-900 font-bold">✓</span> Interlocuteur dédié sans centrale d'appels
                </li>
              </ul>
            </div>
            <Link
              href="/entreprises"
              className="block w-full py-3.5 text-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm shadow-sm active:scale-98"
            >
              Demander un devis / renfort
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SECTEURS D'ACTIVITÉ */}
      <section className="bg-white border-y border-slate-200/70 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Nos domaines d'intervention</h2>
            <p className="text-sm text-slate-600">Des profils ciblés pour répondre aux exigences techniques de chaque secteur.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bâtiment & TP', desc: 'Maçons, électriciens, coffreurs, manœuvres' },
              { label: 'Transport & Logistique', desc: 'Caristes 1-3-5, préparateurs de commandes, chauffeurs' },
              { label: 'Tertiaire & Services', desc: 'Comptabilité, administration des ventes, accueil' },
              { label: 'Industrie & Maintenance', desc: 'Techniciens de maintenance, opérateurs de ligne' },
            ].map((sector) => (
              <div key={sector.label} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 hover:border-[#0062FF]/40 text-left shadow-xs transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{sector.label}</h3>
                <p className="text-xs text-slate-500 leading-normal">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LISTE DYNAMIQUE DES OFFRES */}
      <section id="offres" className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full scroll-mt-6">
        <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Offres à pourvoir</h2>
            <p className="text-sm text-slate-500">Postulez directement en ligne ou contactez notre agence.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-[#0062FF] border border-blue-200 rounded-full w-fit">
            {jobs.length} offre{jobs.length > 1 ? 's' : ''} active{jobs.length > 1 ? 's' : ''}
          </span>
        </div>

        <JobList initialJobs={jobs} />
      </section>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}