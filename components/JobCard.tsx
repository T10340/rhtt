import Link from 'next/link';
import React from 'react';

interface JobCardProps {
  id?: string;
  title: string;
  location: string;
  contractType: string;
  salary: string;
  category?: string;
  viewMode?: 'grid' | 'list';
}

export default function JobCard({
  id,
  title,
  location,
  contractType,
  salary,
  category,
  viewMode = 'grid',
}: JobCardProps) {
  // Déterminer la couleur du badge selon le type de contrat
  const getContractBadge = (contract: string) => {
    const c = contract.toLowerCase();
    if (c.includes('cdi')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (c.includes('cdd')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (c.includes('stage') || c.includes('alternance')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-rhtt-violet-50 text-rhtt-violet-700 border-rhtt-violet-200'; // Intérim aux couleurs RHTT
  };

  // Icône du secteur
  const getCategoryIcon = (cat?: string) => {
    if (!cat) return '💼';
    const c = cat.toLowerCase();
    if (c.includes('logistique') || c.includes('transport')) return '🚚';
    if (c.includes('btp') || c.includes('bâtiment') || c.includes('construction')) return '🏗️';
    if (c.includes('tertiaire') || c.includes('service') || c.includes('administration')) return '🏢';
    if (c.includes('industrie') || c.includes('maintenance')) return '⚙️';
    return '💼';
  };

  // Vue LISTE
  if (viewMode === 'list') {
    return (
      <article className="group w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rhtt-violet-300 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getContractBadge(
                contractType
              )}`}
            >
              {contractType}
            </span>
            {category && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                <span>{getCategoryIcon(category)}</span>
                <span>{category}</span>
              </span>
            )}
            <span className="text-[11px] text-slate-400 font-medium">
              ⚡ Pourvu sous 24/48h
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rhtt-violet transition-colors">
            <Link href={`/offres/${id}`}>{title}</Link>
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
            <span>•</span>
            <span className="font-semibold text-rhtt-violet-700 font-mono bg-rhtt-violet-50/80 px-2 py-0.5 rounded border border-rhtt-violet-100/60">
              💶 {salary}
            </span>
            <span>•</span>
            <span className="text-slate-400">Agence RHTT Paris / IdF</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Link
            href={`/offres/${id}`}
            className="px-4 py-2.5 bg-rhtt-orange hover:bg-rhtt-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Voir l'offre</span>
            <span>→</span>
          </Link>
        </div>
      </article>
    );
  }

  // Vue GRILLE (Défaut)
  return (
    <article className="group w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rhtt-violet-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Badges d'en-tête */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getContractBadge(
              contractType
            )}`}
          >
            {contractType}
          </span>
          {category && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 truncate max-w-[150px]">
              <span>{getCategoryIcon(category)}</span>
              <span className="truncate">{category}</span>
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-rhtt-violet transition-colors leading-snug line-clamp-2">
          <Link href={`/offres/${id}`}>{title}</Link>
        </h3>

        {/* Localisation */}
        <p className="text-slate-500 text-xs flex items-center gap-1 font-medium">
          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </p>
      </div>

      {/* Rémunération & CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Rémunération</span>
          <span className="text-xs font-mono font-bold text-rhtt-violet-700 truncate block">
            {salary}
          </span>
        </div>

        <Link
          href={`/offres/${id}`}
          className="bg-rhtt-orange-50 group-hover:bg-rhtt-orange text-rhtt-orange-700 group-hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 shadow-2xs"
        >
          Consulter
        </Link>
      </div>
    </article>
  );
}