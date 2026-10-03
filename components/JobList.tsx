'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import JobCard from './JobCard';
import { FormattedJob } from '@/lib/wordpress';

interface JobListProps {
  initialJobs?: FormattedJob[];
}

export default function JobList({ initialJobs = [] }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedContract, setSelectedContract] = useState('Tous');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // État du dropdown ville avec recherche
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Extraction dynamique des filtres selon les offres réelles publiées
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

  const activeAdvancedFiltersCount =
    (selectedContract !== 'Tous' ? 1 : 0) + (selectedCity !== 'Toutes' ? 1 : 0);

  // Filtrage combiné (texte, catégorie, contrat, ville)
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === 'Tous' || job.category === selectedCategory;
      const matchContract =
        selectedContract === 'Tous' || job.contractType === selectedContract;
      const matchCity =
        selectedCity === 'Toutes' || job.location === selectedCity;

      return matchSearch && matchCategory && matchContract && matchCity;
    });
  }, [initialJobs, searchTerm, selectedCategory, selectedContract, selectedCity]);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tous');
    setSelectedContract('Tous');
    setSelectedCity('Toutes');
    setCitySearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Barre principale */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Métier, mot-clé (ex. Cariste, Assistant)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
              showAdvanced || activeAdvancedFiltersCount > 0
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>⚙ Filtres avancés</span>
            {activeAdvancedFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeAdvancedFiltersCount}
              </span>
            )}
            <span className="text-xs">{showAdvanced ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Pilules catégories dynamiques */}
        {categories.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 text-sm no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Tiroir filtres avancés */}
        {showAdvanced && (
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Dropdown Ville avec recherche */}
            <div className="relative" ref={cityDropdownRef}>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Ville
              </label>

              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <span className="truncate text-gray-800">{selectedCity}</span>
                <span className="text-xs text-gray-400">▼</span>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={citySearchQuery}
                      onChange={(e) => setCitySearchQuery(e.target.value)}
                      placeholder="Rechercher une ville..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-gray-200 focus:outline-none focus:border-blue-600"
                      autoFocus
                    />
                    <span className="absolute left-2.5 top-1.5 text-gray-400 text-xs">🔍</span>
                  </div>

                  <ul className="max-h-44 overflow-y-auto space-y-0.5 text-sm">
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
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                              selectedCity === city
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {city}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-2 py-2 text-xs text-gray-400 text-center">
                        Aucune ville trouvée
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Type de contrat */}
            <div>
              <label
                htmlFor="filter-contract"
                className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide"
              >
                Type de contrat
              </label>
              <select
                id="filter-contract"
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {contractTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton Réinitialiser */}
            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <button
                type="button"
                onClick={resetAllFilters}
                className="w-full py-2 px-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Compteur d'offres */}
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-gray-500">
          {filteredJobs.length} {filteredJobs.length > 1 ? 'offres disponibles' : 'offre disponible'}
        </span>
      </div>

      {/* Grille */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              contractType={job.contractType}
              salary={job.salary}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-base">Aucune annonce ne correspond à ces critères.</p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      )}
    </div>
  );
}