'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface HeroJobSearchProps {
  className?: string;
}

const POPULAR_TRADES = [
  'Cariste CACES 1-3-5',
  'Maçon Coffreur / Bancheur',
  'Préparateur de commandes',
  'Électricien Tertiaire',
  'Conducteur SPL / Poids Lourd',
  'Technicien de Maintenance',
  'Comptable Auxiliaire',
  'Assistant(e) ADV Bilingue',
];

const POPULAR_LOCATIONS = [
  { label: 'Toute l’Île-de-France', value: 'Île-de-France' },
  { label: 'Paris (75)', value: '75' },
  { label: 'Seine-et-Marne (77)', value: '77' },
  { label: 'Seine-Saint-Denis (93)', value: '93' },
  { label: 'Val-de-Marne (94)', value: '94' },
  { label: 'Val-d’Oise (95)', value: '95' },
  { label: 'Pontault-Combault (77)', value: 'Pontault-Combault' },
  { label: 'Torcy (77)', value: 'Torcy' },
  { label: 'Roissy-en-France (95)', value: 'Roissy' },
];

const QUICK_TAGS = [
  { label: 'Cariste CACES', metier: 'Cariste', loc: '' },
  { label: 'BTP & Chantier', metier: 'BTP', loc: '' },
  { label: 'Conducteur SPL', metier: 'Conducteur SPL', loc: '' },
  { label: 'Comptable', metier: 'Comptable', loc: '' },
  { label: 'Paris (75)', metier: '', loc: '75' },
  { label: 'Seine-et-Marne (77)', metier: '', loc: '77' },
];

export default function HeroJobSearch({ className = '' }: HeroJobSearchProps) {
  const router = useRouter();
  const [metier, setMetier] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [showTradeSuggestions, setShowTradeSuggestions] = useState(false);
  const [showLocSuggestions, setShowLocSuggestions] = useState(false);

  const tradeContainerRef = useRef<HTMLDivElement>(null);
  const locContainerRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tradeContainerRef.current && !tradeContainerRef.current.contains(event.target as Node)) {
        setShowTradeSuggestions(false);
      }
      if (locContainerRef.current && !locContainerRef.current.contains(event.target as Node)) {
        setShowLocSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const executeSearch = (metierVal: string, locVal: string) => {
    setShowTradeSuggestions(false);
    setShowLocSuggestions(false);

    if (typeof window !== 'undefined') {
      // 1. Émission de l'événement personnalisé pour mise à jour immédiate du JobList
      window.dispatchEvent(
        new CustomEvent('rhtt:filter-jobs', {
          detail: {
            metier: metierVal.trim(),
            loc: locVal.trim(),
          },
        })
      );

      // 2. Synchronisation de l'URL pour la persistance du partage / historique
      const params = new URLSearchParams();
      if (metierVal.trim()) params.set('metier', metierVal.trim());
      if (locVal.trim()) params.set('loc', locVal.trim());
      const queryStr = params.toString() ? `?${params.toString()}` : '';

      if (window.location.pathname === '/') {
        window.history.replaceState(null, '', `/${queryStr}#offres`);
        const target = document.getElementById('offres');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`/${queryStr}#offres`);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeSearch(metier, localisation);
  };

  const handleQuickTagClick = (tagMetier: string, tagLoc: string) => {
    const newMetier = tagMetier || metier;
    const newLoc = tagLoc || localisation;
    if (tagMetier) setMetier(tagMetier);
    if (tagLoc) setLocalisation(tagLoc);
    executeSearch(newMetier, newLoc);
  };

  // Filtrer les suggestions selon la saisie utilisateur
  const filteredTrades = POPULAR_TRADES.filter((t) =>
    t.toLowerCase().includes(metier.toLowerCase())
  );

  const filteredLocations = POPULAR_LOCATIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(localisation.toLowerCase()) ||
      l.value.toLowerCase().includes(localisation.toLowerCase())
  );

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Carte flottante avec fond verre / blanc pur pour un contraste maximal sur l'image */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl shadow-slate-950/40 border border-white/20 text-left transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3">
          
          {/* ======================================================== */}
          {/* CHAMP 1 : MÉTIER / MOT-CLÉ */}
          {/* ======================================================== */}
          <div ref={tradeContainerRef} className="relative flex-1">
            <label
              htmlFor="hero-search-metier"
              className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-rhtt-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Métier, compétences</span>
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="hero-search-metier"
                type="text"
                value={metier}
                onChange={(e) => {
                  setMetier(e.target.value);
                  setShowTradeSuggestions(true);
                }}
                onFocus={() => setShowTradeSuggestions(true)}
                placeholder="Ex: Cariste, Électricien, Maçon, Comptable..."
                autoComplete="off"
                className="w-full h-12 sm:h-13 pl-11 pr-9 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet focus:bg-white transition-all shadow-2xs"
              />
              {metier && (
                <button
                  type="button"
                  onClick={() => setMetier('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition text-xs"
                  aria-label="Effacer le métier"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions Métier */}
            {showTradeSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 max-h-56 overflow-y-auto">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Postes populaires
                </div>
                {(filteredTrades.length > 0 ? filteredTrades : POPULAR_TRADES).map((trade) => (
                  <button
                    key={trade}
                    type="button"
                    onClick={() => {
                      setMetier(trade);
                      setShowTradeSuggestions(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-rhtt-violet-50 hover:text-rhtt-violet font-medium flex items-center justify-between transition-colors"
                  >
                    <span>{trade}</span>
                    <span className="text-[11px] text-slate-400 font-normal">Suggéré</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SÉPARATEUR VISUEL SUR ÉCRANS LARGES */}
          <div className="hidden lg:block w-px h-10 bg-slate-200 self-end mb-1.5" aria-hidden="true" />

          {/* ======================================================== */}
          {/* CHAMP 2 : LOCALISATION */}
          {/* ======================================================== */}
          <div ref={locContainerRef} className="relative flex-1">
            <label
              htmlFor="hero-search-location"
              className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-rhtt-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Localisation</span>
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <svg className="w-5 h-5 text-rhtt-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
              </span>
              <input
                id="hero-search-location"
                type="text"
                value={localisation}
                onChange={(e) => {
                  setLocalisation(e.target.value);
                  setShowLocSuggestions(true);
                }}
                onFocus={() => setShowLocSuggestions(true)}
                placeholder="Ex: Paris (75), 77, 93, Torcy..."
                autoComplete="off"
                className="w-full h-12 sm:h-13 pl-11 pr-9 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet focus:bg-white transition-all shadow-2xs"
              />
              {localisation && (
                <button
                  type="button"
                  onClick={() => setLocalisation('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition text-xs"
                  aria-label="Effacer la localisation"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions Localisation */}
            {showLocSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 max-h-56 overflow-y-auto">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Départements & Bassins d'emploi
                </div>
                {(filteredLocations.length > 0 ? filteredLocations : POPULAR_LOCATIONS).map((locItem) => (
                  <button
                    key={locItem.label}
                    type="button"
                    onClick={() => {
                      setLocalisation(locItem.label);
                      setShowLocSuggestions(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-orange-50 hover:text-rhtt-orange font-medium flex items-center justify-between transition-colors"
                  >
                    <span>📍 {locItem.label}</span>
                    <span className="text-[11px] text-slate-400 font-mono">IDF</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* BOUTON D'ACTION MASSIF (Mobile-First Thumb-Friendly) */}
          {/* ======================================================== */}
          <div className="pt-2 lg:pt-5 w-full lg:w-auto">
            <button
              type="submit"
              className="w-full lg:w-auto min-w-[190px] h-12 sm:h-13 px-6 sm:px-7 bg-rhtt-orange hover:bg-rhtt-orange-600 active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-rhtt-orange/30 hover:shadow-rhtt-orange/45 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-rhtt-orange-300/30 group"
            >
              <span>Rechercher</span>
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </form>

        {/* ======================================================== */}
        {/* PILULES DE RECHERCHE RAPIDE EN 1 CLIC */}
        {/* ======================================================== */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">
            Missions populaires :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleQuickTagClick(tag.metier, tag.loc)}
                className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rhtt-violet-50 text-slate-600 hover:text-rhtt-violet font-semibold transition-colors cursor-pointer border border-slate-200/60"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Micro-réassurance discrète sous le module */}
      <div className="mt-3 flex items-center justify-center flex-wrap gap-4 text-xs text-slate-200/90 font-medium drop-shadow-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Missions actualisées quotidiennement
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-rhtt-orange font-bold">✓</span>
          Candidature rapide en moins de 2 minutes
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-rhtt-orange font-bold">✓</span>
          Réponse agence sous 24h
        </span>
      </div>
    </div>
  );
}
