import Header from '@/components/Header';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/wordpress';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OffreDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const job = await getJobById(decodedId);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          ← Retour aux offres
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {job.contractType}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                {job.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 border-b border-gray-100 pb-6">
              <span className="flex items-center gap-1 font-medium">
                📍 {job.location}
              </span>
              <span className="flex items-center gap-1 font-medium">
                💶 {job.salary}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                Qualification
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {job.qualification || 'Non précisé'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                Expérience
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {job.anneesExperience || 'Débutant accepté'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                Niveau d'études
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {job.niveauDetude || 'Non requis'}
              </p>
            </div>
          </div>

          {job.descriptifPoste && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
                Descriptif du poste
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {job.descriptifPoste}
              </div>
            </section>
          )}

          {job.profilRecherche && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
                Profil recherché
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {job.profilRecherche}
              </div>
            </section>
          )}

          {job.aProposClient && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
                À propos de l'entreprise
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {job.aProposClient}
              </div>
            </section>
          )}

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span className="text-xs text-gray-400 font-mono">
              Réf : {job.id}
            </span>
            <Link
              href={`/postuler?offre=${encodeURIComponent(job.title)}`}
              className="w-full sm:w-auto text-center bg-blue-600 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm"
            >
              Postuler à cette offre
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}