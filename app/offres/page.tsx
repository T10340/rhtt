import Header from '@/components/Header';
import JobList from '@/components/JobList';
import { getJobs } from '@/lib/wordpress';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OffresPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 md:py-12 w-full space-y-6">
        {/* En-tête de la page des offres */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/" className="text-xs font-semibold text-rhtt-violet hover:text-rhtt-violet-800">
                ← Accueil
              </Link>
              <span className="text-xs text-slate-300">/</span>
              <span className="text-xs text-slate-500 font-medium">Offres d'emploi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Toutes nos offres d'emploi en Île-de-France
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Filtrez par mot-clé, secteur d'activité, type de contrat et localisation en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-rhtt-violet-50 text-rhtt-violet-800 border border-rhtt-violet-200 text-xs font-bold rounded-full whitespace-nowrap">
              {jobs.length} postes disponibles
            </span>
          </div>
        </div>

        {/* Moteur de recherche et filtres instantanés */}
        <JobList initialJobs={jobs} />
      </main>
    </div>
  );
}
