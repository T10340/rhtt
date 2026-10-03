import Header from '@/components/Header';
import JobList from '@/components/JobList';
import { getJobs } from '@/lib/wordpress';

export default async function Home() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <section className="mb-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Trouvez la mission qui <br className="hidden sm:block" />
            <span className="text-blue-600">vous correspond.</span>
          </h1>
          <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-xl">
            Rejoignez RHTT Intérim et accédez à des offres d'emploi en Île-de-France.
          </p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nos dernières offres</h2>
          </div>
          <JobList initialJobs={jobs} />
        </section>
      </main>
    </div>
  );
}