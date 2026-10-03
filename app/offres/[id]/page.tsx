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

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {job.contractType}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
              {job.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
            <span>📍 {job.location}</span>
            <span>💶 {job.salary}</span>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Description du poste</h2>
            {job.content ? (
              <div dangerouslySetInnerHTML={{ __html: job.content }} />
            ) : (
              <p className="text-gray-500 italic">
                Consultez notre agence pour obtenir l'ensemble des détails opérationnels liés à cette mission.
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span className="text-xs text-gray-400">Référence : {job.id}</span>
            <Link
              href={`/postuler?offre=${encodeURIComponent(job.title)}`}
              className="w-full sm:w-auto text-center bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Postuler à cette offre
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}