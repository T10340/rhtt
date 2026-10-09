'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import JobCard from './JobCard';
import { FormattedJob } from '@/lib/wordpress';

interface JobListProps {
  initialJobs?: FormattedJob[];
}

type SortOption = 'pertinence' | 'recent' | 'salaire_desc' | 'alpha_asc';

export default function JobList({ initialJobs = [] }: JobListProps) {
  // États de recherche et de filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedContract, setSelectedContract] = useState('Tous');
  const [selectedDepartment, setSelectedDepartment] = useState('Tous');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [sortBy, setSortBy] = useState<SortOption>('pertinence');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // État du tiroir de filtres avancés
  const [showAdvanced, setShowAdvanced] = useState(false);

  // État du dropdown ville avec recherche
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Extraction dynamique des filtres et départements
  const categories = useMemo(() => {
    const set = new Set(initialJobs.map((j) => j.category).filter(Boolean));
    return ['Tous', ...Array.from(set)];
  }, [initialJobs]);

  const contractTypes = useMemo(() => {
    const set = new Set(initialJobs.map((j) => j.contractType).filter(Boolean));
    return ['Tous', ...Array.from(set)];
  }, [initialJobs]);

  const cities = useMemo(() => {
    const set = new Set(initialJobs.map((j) => j.location).filter(Boolean));
    return ['Toutes', ...Array.from(set)];
  }, [initialJobs]);

  // Liste des départements d'Île-de-France et région
  const departments = [
    { code: 'Tous', label: 'Toute l’Île-de-France' },
    { code: '75', label: 'Paris (75)' },
    { code: '77', label: 'Seine-et-Marne (77)' },
    { code: '93', label: 'Seine-Saint-Denis (93)' },
    { code: '94', label: 'Val-de-Marne (94)' },
    { code: '95', label: 'Val-d’Oise (95)' },
  ];

  // Suggestions de mots-clés populaires
  const popularKeywords = ['Cariste', 'Préparateur', 'Comptable', 'Électricien', 'BTP', 'CDI'];

  // Fermeture du dropdown lors d'un clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(citySearchQuery.toLowerCase())
    );
  }, [cities, citySearchQuery]);

  // Helper pour extraire une valeur numérique approximative du salaire pour le tri
  const parseSalaryValue = (salaryStr: string): number => {
    const clean = salaryStr.replace(/\s+/g, '').replace(',', '.');
    const match = clean.match(/(\d+(\.\d+)?)/);
    if (!match) return 0;
    const val = parseFloat(match[1]);
    // Si c'est un taux horaire (ex: 14 €), on normalise sur un mois (151.67h) pour comparer avec des salaires mensuels
    if (val < 50) {
      return val * 151.67;
    }
    // Si c'est un annuel (ex: 35000 €), on divise par 12
    if (val > 10000) {
      return val / 12;
    }
    return val;
  };

  // Filtrage combiné en temps réel
  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return initialJobs.filter((job) => {
      // 1. Mot-clé (Titre, Localisation, Catégorie, Référence)
      const matchSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.reference.toLowerCase().includes(query) ||
        job.contractType.toLowerCase().includes(query);

      // 2. Secteur
      const matchCategory =
        selectedCategory === 'Tous' || job.category === selectedCategory;

      // 3. Contrat
      const matchContract =
        selectedContract === 'Tous' || job.contractType === selectedContract;

      // 4. Localisation précise
      const matchCity =
        selectedCity === 'Toutes' || job.location === selectedCity;

      // 5. Département
      const matchDepartment =
        selectedDepartment === 'Tous' ||
        job.location.includes(`(${selectedDepartment})`) ||
        (selectedDepartment === '75' && job.location.toLowerCase().includes('paris'));

      return matchSearch && matchCategory && matchContract && matchCity && matchDepartment;
    });
  }, [initialJobs, searchTerm, selectedCategory, selectedContract, selectedCity, selectedDepartment]);

  // Tri des offres filtrées
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];

    if (sortBy === 'recent') {
      // Les offres sont supposées ordonnées par ordre naturel / ID
      return list;
    }

    if (sortBy === 'salaire_desc') {
      return list.sort((a, b) => parseSalaryValue(b.salary) - parseSalaryValue(a.salary));
    }

    if (sortBy === 'alpha_asc') {
      return list.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
    }

    // Pertinence : priorise les offres dont le titre contient le mot recherché
    if (sortBy === 'pertinence' && searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      return list.sort((a, b) => {
        const aInTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
        const bInTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
        return bInTitle - aInTitle;
      });
    }

    return list;
  }, [filteredJobs, sortBy, searchTerm]);

  // Compteur d'offres par catégorie pour afficher des badges interactifs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: initialJobs.length };
    initialJobs.forEach((j) => {
      counts[j.category] = (counts[j.category] || 0) + 1;
    });
    return counts;
  }, [initialJobs]);

  // Nombre de filtres actifs
  const activeFiltersCount =
    (searchTerm.trim() ? 1 : 0) +
    (selectedCategory !== 'Tous' ? 1 : 0) +
    (selectedContract !== 'Tous' ? 1 : 0) +
    (selectedDepartment !== 'Tous' ? 1 : 0) +
    (selectedCity !== 'Toutes' ? 1 : 0);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tous');
    setSelectedContract('Tous');
    setSelectedDepartment('Tous');
    setSelectedCity('Toutes');
    setCitySearchQuery('');
    setSortBy('pertinence');
  };

  return (
    <div className="space-y-6">
      
      {/* ======================================================== */}
      {/* 1. PANNEAU DE RECHERCHE PRINCIPALE (Barre + Filtres) */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        
        {/* Ligne 1 : Champ Mot-Clé + Sélecteur Localisation Rapide + Toggle Filtres */}
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Input de recherche temps réel */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Métier, compétence, mot-clé (ex: Cariste, Comptable, CACES 3)..."
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet focus:bg-white transition-all shadow-2xs"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 p-1 text-xs rounded-full hover:bg-slate-200 transition"
                title="Effacer la recherche"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sélecteur Département express */}
          <div className="w-full lg:w-60">
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedCity('Toutes');
              }}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet focus:bg-white transition-all cursor-pointer shadow-2xs"
            >
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  📍 {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton pour ouvrir / fermer les filtres avancés */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer shadow-2xs ${
              showAdvanced || activeFiltersCount > 0
                ? 'bg-rhtt-violet-50 border-rhtt-violet-200 text-rhtt-violet-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100 bg-white'
            }`}
          >
            <svg className="w-4 h-4 text-rhtt-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filtres</span>
            {activeFiltersCount > 0 && (
              <span className="bg-rhtt-violet text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {activeFiltersCount}
              </span>
            )}
            <span className="text-xs text-slate-400">{showAdvanced ? '▲' : '▼'}</span>
          </button>

        </div>

        {/* Suggestions rapides de mots-clés */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Recherches fréquentes :</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => setSearchTerm(kw)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                searchTerm.toLowerCase() === kw.toLowerCase()
                  ? 'bg-rhtt-violet text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Ligne 2 : Pilules Secteurs d'activité avec badges */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Secteurs d'activité
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-rhtt-violet text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-rhtt-violet-800 text-white'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ligne 3 : Tiroir Filtres avancés (Type de contrat, Ville spécifique, etc.) */}
        {showAdvanced && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-150">
            
            {/* Filtre Type de contrat */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                Type de contrat
              </label>
              <div className="flex flex-wrap gap-1.5">
                {contractTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedContract(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedContract === type
                        ? 'bg-rhtt-violet text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Dropdown Ville spécifique avec recherche intégrée */}
            <div className="relative" ref={cityDropdownRef}>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                Ville d'affectation
              </label>

              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 border border-slate-200 rounded-xl text-xs bg-white text-left focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet shadow-2xs"
              >
                <span className="truncate text-slate-800 font-medium">📍 {selectedCity}</span>
                <span className="text-xs text-slate-400">▼</span>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-xl p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={citySearchQuery}
                      onChange={(e) => setCitySearchQuery(e.target.value)}
                      placeholder="Filtrer une ville..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-rhtt-violet"
                      autoFocus
                    />
                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">🔍</span>
                  </div>

                  <ul className="max-h-48 overflow-y-auto space-y-0.5 text-xs">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <li key={city}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCity(city);
                              setIsCityDropdownOpen(false);
                              setCitySearchQuery('');
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                              selectedCity === city
                                ? 'bg-rhtt-violet text-white font-bold'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {city}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-2 py-3 text-xs text-slate-400 text-center">
                        Aucune localisation correspondante
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Bouton Réinitialiser */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={resetAllFilters}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réinitialiser tous les filtres
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 2. BARRE D'ÉTAT : RÉSULTATS, TRI, ET FILTRES ACTIFS */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        
        {/* Compteur d'offres */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-900">
            {sortedJobs.length} offre{sortedJobs.length > 1 ? 's' : ''} disponible{sortedJobs.length > 1 ? 's' : ''}
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-xs text-slate-400">
              (sur {initialJobs.length} au total)
            </span>
          )}
        </div>

        {/* Sélecteur de Tri + Vue Grille / Liste */}
        <div className="flex items-center gap-3">
          
          {/* Menu de tri */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hidden sm:inline font-medium">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet cursor-pointer shadow-2xs"
            >
              <option value="pertinence">⚡ Pertinence</option>
              <option value="recent">🕒 Plus récentes</option>
              <option value="salaire_desc">💰 Salaire le plus élevé</option>
              <option value="alpha_asc">🔤 Intitulé (A → Z)</option>
            </select>
          </div>

          {/* Toggle Vue Grille / Liste */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-rhtt-violet shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vue Grille"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-rhtt-violet shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vue Liste"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

      </div>

      {/* Badges des filtres actifs révocables en 1 clic */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Filtres appliqués :</span>

          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rhtt-violet-50 text-rhtt-violet-800 font-semibold border border-rhtt-violet-200">
              <span>Mot-clé : "{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="hover:text-rhtt-violet-900 cursor-pointer">✕</button>
            </span>
          )}

          {selectedCategory !== 'Tous' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rhtt-violet-50 text-rhtt-violet-800 font-semibold border border-rhtt-violet-200">
              <span>Secteur : {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('Tous')} className="hover:text-rhtt-violet-900 cursor-pointer">✕</button>
            </span>
          )}

          {selectedContract !== 'Tous' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rhtt-violet-50 text-rhtt-violet-800 font-semibold border border-rhtt-violet-200">
              <span>Contrat : {selectedContract}</span>
              <button onClick={() => setSelectedContract('Tous')} className="hover:text-rhtt-violet-900 cursor-pointer">✕</button>
            </span>
          )}

          {selectedDepartment !== 'Tous' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rhtt-violet-50 text-rhtt-violet-800 font-semibold border border-rhtt-violet-200">
              <span>Département : {selectedDepartment}</span>
              <button onClick={() => setSelectedDepartment('Tous')} className="hover:text-rhtt-violet-900 cursor-pointer">✕</button>
            </span>
          )}

          {selectedCity !== 'Toutes' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rhtt-violet-50 text-rhtt-violet-800 font-semibold border border-rhtt-violet-200">
              <span>Ville : {selectedCity}</span>
              <button onClick={() => setSelectedCity('Toutes')} className="hover:text-rhtt-violet-900 cursor-pointer">✕</button>
            </span>
          )}

          <button
            onClick={resetAllFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-1 cursor-pointer underline"
          >
            Tout effacer
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. GRILLE OU LISTE DES OFFRES D'EMPLOI */}
      {/* ======================================================== */}
      {sortedJobs.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3'
          }
        >
          {sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              contractType={job.contractType}
              salary={job.salary}
              category={job.category}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        /* État vide soigné avec aide et suggestions */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-rhtt-orange-50 text-rhtt-orange flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Aucune offre ne correspond à votre recherche</h3>
            <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
              Essayez de modifier votre mot-clé, d'élargir la zone géographique ou de réinitialiser certains filtres.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 bg-rhtt-orange hover:bg-rhtt-orange-600 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
            >
              Afficher toutes les offres ({initialJobs.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}