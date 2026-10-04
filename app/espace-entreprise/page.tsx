'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

// Types pour la structure des données de l'espace entreprise
interface WorkerAssignment {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  photoUrl?: string;
  poste: string;
  service: string;
  site: string;
  dateDebut: string;
  dateFinPrevue: string;
  tauxHoraireHT: number;
  heuresSemaineEnCours: number;
  statutPointage: 'valide' | 'en_attente' | 'saisi';
  telephone: string;
  habilitations: string[];
  alerteFin?: boolean;
}

interface WorkerHistory {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  poste: string;
  periode: string;
  totalHeures: number;
  motifFin: string;
  evaluationNote: number; // sur 5
  evaluationCommentaire: string;
  recommandable: boolean;
}

interface Invoice {
  id: string;
  numero: string;
  dateEmission: string;
  dateEcheance: string;
  objet: string;
  montantHT: number;
  montantTTC: number;
  statut: 'payee' | 'en_attente' | 'en_retard';
  joursRetard?: number;
  fichierUrl?: string;
}

interface SafeDocument {
  id: string;
  nom: string;
  categorie: 'contrat' | 'facture' | 'releve_heures' | 'conformite_legale' | 'protocole';
  dateAjout: string;
  taille: string;
  reference?: string;
  signeElectronique: boolean;
  certificat?: string;
}

// Données mockées ultra-complètes de l'Entreprise Cliente
const CLIENT_DATA = {
  entreprise: {
    raisonSociale: 'LogistiX Hub France SAS',
    siret: '842 901 349 00028',
    tvaIntra: 'FR 68 842901349',
    codeNaf: '52.10B - Entreposage et stockage non frigorifique',
    codeClient: 'CLI-8842',
    statutCompte: 'Grand Compte Partenaire',
    adresseSiege: "14 Rue du Parc des Chenes, 77340 Pontault-Combault",
    adresseFacturation: "14 Rue du Parc des Chenes, 77340 Pontault-Combault",
    conditionsReglement: "Virement à 30 jours fin de mois",
    plafondEncours: '75 000 €',
  },
  contactPrincipal: {
    nom: 'Marc Lefebvre',
    poste: 'Directeur Logistique & RH',
    email: 'm.lefebvre@logistix-hub.fr',
    telephone: '01 64 88 12 30',
    mobile: '06 14 55 89 20',
  },
  equipeInterne: [
    { nom: 'Marc Lefebvre', role: 'Directeur Logistique (Admin)', email: 'm.lefebvre@logistix-hub.fr', tel: '06 14 55 89 20' },
    { nom: 'Sarah Benali', role: 'Responsable Paie & Facturation', email: 's.benali@logistix-hub.fr', tel: '01 64 88 12 35' },
    { nom: 'Thomas Roux', role: 'Chef de quai / Planification', email: 't.roux@logistix-hub.fr', tel: '06 98 40 12 11' },
  ],
  conseillerRHTT: {
    nom: 'Sophie Mercier',
    poste: 'Chargée de comptes Entreprises & Logistique',
    agence: 'Agence RHTT Pontault-Combault / Val d’Europe',
    telephone: '01 60 29 00 45',
    mobile: '06 45 10 22 89',
    email: 's.mercier@rhtt.fr',
    adresseAgence: '12 Avenue de la République, 77340 Pontault-Combault',
    tauxReponse: '< 2h ouvrées',
  },
};

const MOCK_WORKERS_ACTIVE: WorkerAssignment[] = [
  {
    id: 'W-01',
    matricule: 'INT-4092',
    nom: 'Lemoine',
    prenom: 'Alexandre',
    poste: 'Cariste d’entrepôt CACES 1-3-5',
    service: 'Réception & Stockage',
    site: 'Plateforme Pontault (Quai B)',
    dateDebut: '01/09/2026',
    dateFinPrevue: '31/10/2026',
    tauxHoraireHT: 21.80,
    heuresSemaineEnCours: 35,
    statutPointage: 'valide',
    telephone: '06 12 34 56 78',
    habilitations: ['CACES R489 1A/3/5', 'Visite médicale valide (2027)'],
    alerteFin: false,
  },
  {
    id: 'W-02',
    matricule: 'INT-5104',
    nom: 'Fontaine',
    prenom: 'Lucas',
    poste: 'Cariste frontalier CACES 3',
    service: 'Expédition & Préparation',
    site: 'Plateforme Pontault (Quai A)',
    dateDebut: '15/08/2026',
    dateFinPrevue: '09/10/2026',
    tauxHoraireHT: 21.20,
    heuresSemaineEnCours: 32,
    statutPointage: 'en_attente',
    telephone: '06 45 78 90 12',
    habilitations: ['CACES R489 3', 'Habilitation Électrique H0B0'],
    alerteFin: true, // Fin dans moins de 7 jours !
  },
  {
    id: 'W-03',
    matricule: 'INT-6230',
    nom: 'Diallo',
    prenom: 'Mamadou',
    poste: 'Préparateur de commandes vocale',
    service: 'Picking E-commerce',
    site: 'Site Torcy Logistique',
    dateDebut: '08/09/2026',
    dateFinPrevue: '15/11/2026',
    tauxHoraireHT: 19.50,
    heuresSemaineEnCours: 35,
    statutPointage: 'valide',
    telephone: '07 89 22 13 45',
    habilitations: ['CACES R489 1B', 'Sensibilisation Gestes & Postures'],
    alerteFin: false,
  },
  {
    id: 'W-04',
    matricule: 'INT-7119',
    nom: 'Moreau',
    prenom: 'Camille',
    poste: 'Gestionnaire de stock / ADV Quai',
    service: 'Supervision & Flux',
    site: 'Plateforme Pontault (Bureaux Log)',
    dateDebut: '01/07/2026',
    dateFinPrevue: '31/12/2026',
    tauxHoraireHT: 24.00,
    heuresSemaineEnCours: 35,
    statutPointage: 'en_attente',
    telephone: '06 67 89 01 23',
    habilitations: ['WMS SAP & Reflex', 'Anglais logistique'],
    alerteFin: false,
  },
  {
    id: 'W-05',
    matricule: 'INT-8802',
    nom: 'Benkacem',
    prenom: 'Yassine',
    poste: 'Manutentionnaire charge lourde',
    service: 'Dépotage conteneurs',
    site: 'Plateforme Pontault (Zone C)',
    dateDebut: '22/09/2026',
    dateFinPrevue: '24/10/2026',
    tauxHoraireHT: 18.90,
    heuresSemaineEnCours: 28,
    statutPointage: 'en_attente',
    telephone: '07 55 12 34 89',
    habilitations: ['SST Sauveteur Secouriste', 'Port des EPI certifié'],
    alerteFin: false,
  },
];

const MOCK_WORKERS_HISTORY: WorkerHistory[] = [
  {
    id: 'WH-01',
    matricule: 'INT-3310',
    nom: 'Garnier',
    prenom: 'Julien',
    poste: 'Cariste CACES 5 grande hauteur',
    periode: 'Avril 2026 - Août 2026 (5 mois)',
    totalHeures: 680,
    motifFin: 'Embauche directe en CDI chez LogistiX Hub',
    evaluationNote: 5,
    evaluationCommentaire: 'Excellent profil, rigoureux, très bonne cadence et respect absolu des règles de sécurité.',
    recommandable: true,
  },
  {
    id: 'WH-02',
    matricule: 'INT-2908',
    nom: 'Traoré',
    prenom: 'Ibrahima',
    poste: 'Préparateur de commandes CACES 1',
    periode: 'Juin 2026 - Septembre 2026 (3 mois)',
    totalHeures: 420,
    motifFin: 'Fin de contrat prévue / Baisse saisonnière',
    evaluationNote: 4.8,
    evaluationCommentaire: 'Très fiable, aucun retard ni absence constatée. Productivité au-dessus des standards.',
    recommandable: true,
  },
  {
    id: 'WH-03',
    matricule: 'INT-1845',
    nom: 'Ribeiro',
    prenom: 'Antonio',
    poste: 'Chef d’équipe adjoint quai de nuit',
    periode: 'Janvier 2026 - Mai 2026 (5 mois)',
    totalHeures: 740,
    motifFin: 'Projet d’intérim terminé avec succès',
    evaluationNote: 5,
    evaluationCommentaire: 'Meneur d’hommes naturel. A géré la transition logicielle WMS sans aucun accroc.',
    recommandable: true,
  },
  {
    id: 'WH-04',
    matricule: 'INT-1402',
    nom: 'Boucher',
    prenom: 'Kévin',
    poste: 'Manutentionnaire',
    periode: 'Février 2026 - Mars 2026 (2 mois)',
    totalHeures: 280,
    motifFin: 'Fin de mission normale',
    evaluationNote: 3.8,
    evaluationCommentaire: 'Bon travail d’ensemble, bon respect des consignes générales.',
    recommandable: true,
  },
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-1049',
    numero: 'FAC-2026-1049',
    dateEmission: '01/10/2026',
    dateEcheance: '31/10/2026',
    objet: 'Semaine 39 - Délégation 5 intérimaires Logistique',
    montantHT: 8240.00,
    montantTTC: 9888.00,
    statut: 'en_attente',
  },
  {
    id: 'INV-1044',
    numero: 'FAC-2026-1044',
    dateEmission: '24/09/2026',
    dateEcheance: '24/10/2026',
    objet: 'Semaine 38 - Délégation 5 intérimaires Logistique',
    montantHT: 7300.00,
    montantTTC: 8762.00,
    statut: 'en_attente',
  },
  {
    id: 'INV-1031',
    numero: 'FAC-2026-1031',
    dateEmission: '15/08/2026',
    dateEcheance: '15/09/2026',
    objet: 'Semaine 32 - Renfort d’été & Dépotage conteneurs',
    montantHT: 3200.00,
    montantTTC: 3840.00,
    statut: 'en_retard',
    joursRetard: 19,
  },
  {
    id: 'INV-1020',
    numero: 'FAC-2026-1020',
    dateEmission: '31/07/2026',
    dateEcheance: '31/08/2026',
    objet: 'Semaine 30 - Prestations Intérim Pontault',
    montantHT: 11450.00,
    montantTTC: 13740.00,
    statut: 'payee',
  },
  {
    id: 'INV-1008',
    numero: 'FAC-2026-1008',
    dateEmission: '30/06/2026',
    dateEcheance: '31/07/2026',
    objet: 'Semaine 26 - Prestations Intérim Torcy & Pontault',
    montantHT: 12900.00,
    montantTTC: 15480.00,
    statut: 'payee',
  },
];

const MOCK_SAFE_DOCS: SafeDocument[] = [
  {
    id: 'DOC-901',
    nom: 'Contrat de mise à disposition #CT-2026-4412 (Alexandre Lemoine)',
    categorie: 'contrat',
    dateAjout: '01/09/2026',
    taille: '412 Ko',
    reference: 'CT-2026-4412',
    signeElectronique: true,
    certificat: 'Certifié eIDAS (RHTT Security Vault)',
  },
  {
    id: 'DOC-902',
    nom: 'Contrat de mise à disposition #CT-2026-4418 (Lucas Fontaine)',
    categorie: 'contrat',
    dateAjout: '15/08/2026',
    taille: '395 Ko',
    reference: 'CT-2026-4418',
    signeElectronique: true,
    certificat: 'Certifié eIDAS (RHTT Security Vault)',
  },
  {
    id: 'DOC-903',
    nom: 'Facture dématérialisée FAC-2026-1049 (S39)',
    categorie: 'facture',
    dateAjout: '01/10/2026',
    taille: '228 Ko',
    reference: 'FAC-2026-1049',
    signeElectronique: true,
    certificat: 'Conforme Factur-X / PDP',
  },
  {
    id: 'DOC-904',
    nom: 'Relevé d’heures & Feuille d’émargement collective — Semaine 38',
    categorie: 'releve_heures',
    dateAjout: '28/09/2026',
    taille: '512 Ko',
    reference: 'RH-2026-S38',
    signeElectronique: true,
    certificat: 'Signé par LogistiX Hub & RHTT',
  },
  {
    id: 'DOC-905',
    nom: 'Attestation de vigilance URSSAF RHTT (3e Trimestre 2026)',
    categorie: 'conformite_legale',
    dateAjout: '10/09/2026',
    taille: '168 Ko',
    reference: 'URSSAF-2026-Q3',
    signeElectronique: true,
    certificat: 'Code d’authentification officiel Urssaf vérifié',
  },
  {
    id: 'DOC-906',
    nom: 'Attestation de Régularité Fiscale RHTT 2026',
    categorie: 'conformite_legale',
    dateAjout: '05/07/2026',
    taille: '142 Ko',
    reference: 'DGFIP-2026-07',
    signeElectronique: true,
    certificat: 'DGFIP Certifiée',
  },
  {
    id: 'DOC-907',
    nom: 'Extrait KBIS RHTT Intérim (Moins de 3 mois)',
    categorie: 'conformite_legale',
    dateAjout: '01/08/2026',
    taille: '210 Ko',
    reference: 'KBIS-77-RHTT',
    signeElectronique: true,
    certificat: 'Greffe du Tribunal de Commerce',
  },
  {
    id: 'DOC-908',
    nom: 'Protocole de sécurité & Consignes d’accueil LogistiX Hub',
    categorie: 'protocole',
    dateAjout: '12/01/2026',
    taille: '890 Ko',
    reference: 'PROT-SECUR-01',
    signeElectronique: false,
  },
];

export default function EspaceEntreprisePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'actifs' | 'historique' | 'facturation' | 'documents' | 'profil'>('dashboard');

  // États de recherche et filtres
  const [searchWorker, setSearchWorker] = useState('');
  const [filterInvoiceStatus, setFilterInvoiceStatus] = useState<'all' | 'payee' | 'en_attente' | 'en_retard'>('all');
  const [filterDocCategory, setFilterDocCategory] = useState<string>('all');
  const [searchDoc, setSearchDoc] = useState('');

  // États pour les modales d'actions
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedInvoiceDetail, setSelectedInvoiceDetail] = useState<Invoice | null>(null);

  // État local des workers pour permettre la validation des heures en temps réel
  const [workers, setWorkers] = useState<WorkerAssignment[]>(MOCK_WORKERS_ACTIVE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calculs financiers
  const totalImpayeRetard = useMemo(() => {
    return MOCK_INVOICES
      .filter((inv) => inv.statut === 'en_retard')
      .reduce((sum, inv) => sum + inv.montantTTC, 0);
  }, []);

  const totalEnAttente = useMemo(() => {
    return MOCK_INVOICES
      .filter((inv) => inv.statut === 'en_attente')
      .reduce((sum, inv) => sum + inv.montantTTC, 0);
  }, []);

  const totalPayeAnnee = useMemo(() => {
    return MOCK_INVOICES
      .filter((inv) => inv.statut === 'payee')
      .reduce((sum, inv) => sum + inv.montantHT, 0);
  }, []);

  // Validation d'heures en un clic
  const handleValidateAllTimesheets = () => {
    setWorkers((prev) =>
      prev.map((w) => ({
        ...w,
        statutPointage: 'valide',
      }))
    );
    setIsValidationModalOpen(false);
    showToast('✓ Tous les relevés d’heures ont été validés et transmis à la paie RHTT !');
  };

  const handleValidateSingleWorker = (id: string, nom: string) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, statutPointage: 'valide' } : w))
    );
    showToast(`✓ Relevé d’heures validé pour ${nom}`);
  };

  // Filtres
  const filteredWorkers = workers.filter((w) => {
    const query = searchWorker.toLowerCase();
    return (
      w.nom.toLowerCase().includes(query) ||
      w.prenom.toLowerCase().includes(query) ||
      w.poste.toLowerCase().includes(query) ||
      w.service.toLowerCase().includes(query)
    );
  });

  const filteredInvoices = MOCK_INVOICES.filter((inv) => {
    if (filterInvoiceStatus === 'all') return true;
    return inv.statut === filterInvoiceStatus;
  });

  const filteredDocs = MOCK_SAFE_DOCS.filter((doc) => {
    const matchesCat = filterDocCategory === 'all' || doc.categorie === filterDocCategory;
    const matchesSearch = doc.nom.toLowerCase().includes(searchDoc.toLowerCase()) || (doc.reference && doc.reference.toLowerCase().includes(searchDoc.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const pendingTimesheetsCount = workers.filter((w) => w.statutPointage === 'en_attente').length;
  const expiringContractsCount = workers.filter((w) => w.alerteFin).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <p className="text-sm font-semibold">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white text-xs ml-2">✕</button>
        </div>
      )}

      {/* Top Banner Entreprise */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Infos entreprise */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Portail Client Sécurisé
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  N° {CLIENT_DATA.entreprise.codeClient}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {CLIENT_DATA.entreprise.statutCompte}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
                {CLIENT_DATA.entreprise.raisonSociale}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                <span>SIRET : <strong className="text-slate-300">{CLIENT_DATA.entreprise.siret}</strong></span>
                <span>•</span>
                <span>Interlocuteur RHTT dédié : <strong className="text-blue-400">{CLIENT_DATA.conseillerRHTT.nom}</strong> ({CLIENT_DATA.conseillerRHTT.agence})</span>
              </div>
            </div>

            {/* CTAs Rapides */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition shadow-md shadow-blue-900/30 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Commander un intérimaire
              </button>

              <button
                type="button"
                onClick={() => setIsValidationModalOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold transition active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Valider les relevés
                {pendingTimesheetsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-amber-500 text-slate-950 text-[11px] font-black rounded-full ring-2 ring-slate-900">
                    {pendingTimesheetsCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-sm font-medium transition cursor-pointer"
                title="Déposer un bon de commande ou protocole"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Déposer un doc
              </button>
            </div>

          </div>

          {/* Alertes globales prioritaires */}
          {(pendingTimesheetsCount > 0 || totalImpayeRetard > 0 || expiringContractsCount > 0) && (
            <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Alerte Relevés */}
              {pendingTimesheetsCount > 0 ? (
                <div className="flex items-center justify-between p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-400 text-base">⚠️</span>
                    <div>
                      <p className="font-bold text-amber-200">{pendingTimesheetsCount} relevé(s) d'heures à valider</p>
                      <p className="text-amber-300/80 text-[11px]">Pour clôturer la paie de la semaine</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsValidationModalOpen(true)}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px] transition"
                  >
                    Vérifier
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                  <span>✓</span>
                  <span>Tous les relevés d'heures de la semaine sont à jour.</span>
                </div>
              )}

              {/* Alerte Impayé */}
              {totalImpayeRetard > 0 ? (
                <div className="flex items-center justify-between p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-rose-400 text-base">🚨</span>
                    <div>
                      <p className="font-bold text-rose-200">1 facture en attente ({totalImpayeRetard.toLocaleString('fr-FR')} € TTC)</p>
                      <p className="text-rose-300/80 text-[11px]">Échue depuis 19 jours (FAC-2026-1031)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('facturation')}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-[11px] transition"
                  >
                    Régulariser
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                  <span>✓</span>
                  <span>Situation comptable saine, aucun impayé.</span>
                </div>
              )}

              {/* Alerte Fin de contrat */}
              {expiringContractsCount > 0 ? (
                <div className="flex items-center justify-between p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-blue-400 text-base">⏳</span>
                    <div>
                      <p className="font-bold text-blue-200">Fin de contrat proche (Lucas Fontaine)</p>
                      <p className="text-blue-300/80 text-[11px]">Échéance au 09/10/2026</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('actifs');
                      showToast('Sélectionnez Prolonger le contrat sur la fiche de Lucas Fontaine.');
                    }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-[11px] transition"
                  >
                    Prolonger
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs text-slate-300">
                  <span>📅</span>
                  <span>Aucun contrat n'arrive à échéance cette semaine.</span>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* Barre de navigation des onglets */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tableau de bord
            </button>

            <button
              onClick={() => setActiveTab('actifs')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'actifs'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Intérimaires en emploi
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-100 text-blue-800">
                {workers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('historique')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'historique'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historique des intérimaires
            </button>

            <button
              onClick={() => setActiveTab('facturation')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'facturation'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
              Factures & Impayés
              {totalImpayeRetard > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-rose-100 text-rose-800">
                  1 impayé
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'documents'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
              </svg>
              Coffre-fort Documents
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-100 text-slate-700">
                {MOCK_SAFE_DOCS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profil')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'profil'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Données Entreprise & RHTT
            </button>

          </nav>
        </div>
      </div>

      {/* Contenu Principal */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* ========================================================= */}
        {/* TAB 1: TABLEAU DE BORD (VUE GLOBALE) */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">

            {/* 4 Indicateurs Clés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Carte 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Intérimaires en mission
                  </span>
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-slate-900">{workers.length}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    100% qualifiés
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Sur 2 plateformes logistiques (Pontault & Torcy)</p>
              </div>

              {/* Carte 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Heures cumulées (Octobre)
                  </span>
                  <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-slate-900">748 h</span>
                  <span className="text-xs text-slate-500">dont 165 h cette semaine</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Carte 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Impayés / En retard
                  </span>
                  <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-rose-600">
                    {totalImpayeRetard.toLocaleString('fr-FR')} €
                  </span>
                  <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                    1 facture
                  </span>
                </div>
                <p className="text-xs text-rose-600 font-medium mt-2">Échéance dépassée de 19 jours</p>
              </div>

              {/* Carte 4 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Documents Coffre-Fort
                  </span>
                  <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-slate-900">{MOCK_SAFE_DOCS.length}</span>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    Certifiés eIDAS
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Conformité légale & Urssaf 100% à jour</p>
              </div>

            </div>

            {/* Vue d'ensemble combinée : Intérimaires en poste & Factures récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* 2 tiers : Aperçu des intérimaires en emploi */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Intérimaires en mission aujourd'hui</h2>
                    <p className="text-xs text-slate-500">Mise à jour en temps réel des plannings de délégation</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('actifs')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    Voir tous les profils →
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="divide-y divide-slate-100">
                    {workers.slice(0, 4).map((worker) => (
                      <div key={worker.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                            {worker.prenom[0]}{worker.nom[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{worker.prenom} {worker.nom}</span>
                              <span className="text-[11px] font-mono text-slate-400">({worker.matricule})</span>
                              {worker.alerteFin && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                                  Fin proche
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-slate-600">{worker.poste}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">📍 {worker.site} • Du {worker.dateDebut} au {worker.dateFinPrevue}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:self-center self-end">
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-slate-800 block">
                              {worker.heuresSemaineEnCours} h saisies
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${worker.statutPointage === 'valide'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                              }`}>
                              {worker.statutPointage === 'valide' ? '✓ Relevé validé' : 'À valider'}
                            </span>
                          </div>

                          {worker.statutPointage !== 'valide' && (
                            <button
                              onClick={() => handleValidateSingleWorker(worker.id, `${worker.prenom} ${worker.nom}`)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold rounded-lg transition"
                            >
                              Valider
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Besoin d'un cariste ou manutentionnaire supplémentaire ?</span>
                    <button
                      onClick={() => setIsOrderModalOpen(true)}
                      className="font-bold text-blue-600 hover:text-blue-800"
                    >
                      Commander un profil →
                    </button>
                  </div>
                </div>

                {/* Bloc Coffre-fort direct */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Derniers documents disponibles</h3>
                    <button onClick={() => setActiveTab('documents')} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                      Consulter le coffre-fort →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MOCK_SAFE_DOCS.slice(0, 4).map((doc) => (
                      <div key={doc.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="p-2 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold">PDF</span>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-800 truncate">{doc.nom}</p>
                            <p className="text-[10px] text-slate-400">{doc.dateAjout} • {doc.taille}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast(`Téléchargement de ${doc.nom}...`)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold shrink-0 cursor-pointer"
                        >
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 1 tiers : Contact dédié RHTT & Situation comptable */}
              <div className="space-y-6">

                {/* Carte Conseiller RHTT */}
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                    <span>👑</span>
                    <span>Votre interlocutrice dédiée</span>
                  </div>
                  <h3 className="text-xl font-bold">{CLIENT_DATA.conseillerRHTT.nom}</h3>
                  <p className="text-xs text-slate-300 mb-4">{CLIENT_DATA.conseillerRHTT.poste}</p>

                  <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">🏢</span>
                      <span>{CLIENT_DATA.conseillerRHTT.agence}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">📞</span>
                      <a href={`tel:${CLIENT_DATA.conseillerRHTT.telephone}`} className="hover:text-blue-300 font-semibold underline">
                        {CLIENT_DATA.conseillerRHTT.telephone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">📱</span>
                      <span>Ligne directe : {CLIENT_DATA.conseillerRHTT.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">✉️</span>
                      <a href={`mailto:${CLIENT_DATA.conseillerRHTT.email}`} className="hover:text-blue-300 truncate underline">
                        {CLIENT_DATA.conseillerRHTT.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <a
                      href={`mailto:${CLIENT_DATA.conseillerRHTT.email}?subject=Question%20Espace%20Entreprise%20LogistiX`}
                      className="w-full text-center py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
                    >
                      Envoyer un message direct
                    </a>
                  </div>
                </div>

                {/* Synthèse Facturation Express */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">État de facturation</h3>
                    <button onClick={() => setActiveTab('facturation')} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                      Gérer →
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-600">En attente d'échéance</span>
                      <span className="text-sm font-bold text-slate-900">{totalEnAttente.toLocaleString('fr-FR')} € TTC</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-100">
                      <span className="text-xs text-rose-700 font-medium">Impayé / Échu</span>
                      <span className="text-sm font-bold text-rose-700">{totalImpayeRetard.toLocaleString('fr-FR')} € TTC</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                      <span className="text-xs text-emerald-800">Règlements reçus (2026)</span>
                      <span className="text-sm font-bold text-emerald-800">{totalPayeAnnee.toLocaleString('fr-FR')} € HT</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('facturation');
                        showToast('Affichage des détails du virement...');
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                    >
                      Télécharger le RIB de règlement RHTT
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INTÉRIMAIRES EN EMPLOI (ACTIFS) */}
        {/* ========================================================= */}
        {activeTab === 'actifs' && (
          <div className="space-y-6">

            {/* Header section avec recherche et action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Intérimaires actuellement en poste ({workers.length})</h2>
                <p className="text-xs text-slate-500">Consultez les contrats en cours, les habilitations et validez les relevés d'heures.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchWorker}
                    onChange={(e) => setSearchWorker(e.target.value)}
                    placeholder="Rechercher nom, poste, service..."
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-xs"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouveau besoin intérim
                </button>
              </div>
            </div>

            {/* Grille détaillée des intérimaires */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${worker.alerteFin ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div>
                    {/* Header carte worker */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-base flex items-center justify-center shadow-xs">
                          {worker.prenom[0]}{worker.nom[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {worker.prenom} {worker.nom}
                          </h3>
                          <span className="text-xs font-mono font-medium text-slate-400">
                            Matricule : {worker.matricule}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${worker.statutPointage === 'valide'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                        }`}>
                        {worker.statutPointage === 'valide' ? 'Pointage validé' : 'Heures à valider'}
                      </span>
                    </div>

                    {/* Poste et service */}
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1">
                      <p className="text-xs font-bold text-slate-800">{worker.poste}</p>
                      <p className="text-[11px] text-slate-500">Service : <strong className="text-slate-700">{worker.service}</strong></p>
                      <p className="text-[11px] text-slate-500">Affectation : <span className="text-slate-700">{worker.site}</span></p>
                    </div>

                    {/* Durée de contrat & Alerte */}
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Période de mission :</span>
                        <span className="font-semibold text-slate-800">{worker.dateDebut} au {worker.dateFinPrevue}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Taux horaire facturé :</span>
                        <span className="font-mono font-bold text-blue-700">{worker.tauxHoraireHT.toFixed(2)} € HT/h</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Heures semaine en cours :</span>
                        <span className="font-mono font-bold text-slate-900">{worker.heuresSemaineEnCours} heures</span>
                      </div>
                    </div>

                    {/* Habilitations */}
                    <div className="mt-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Habilitations vérifiées</p>
                      <div className="flex flex-wrap gap-1.5">
                        {worker.habilitations.map((hab, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md">
                            ✓ {hab}
                          </span>
                        ))}
                      </div>
                    </div>

                    {worker.alerteFin && (
                      <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                        <span>⚠️ Contrat se terminant le {worker.dateFinPrevue}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions carte */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    {worker.statutPointage !== 'valide' ? (
                      <button
                        onClick={() => handleValidateSingleWorker(worker.id, `${worker.prenom} ${worker.nom}`)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                      >
                        Valider {worker.heuresSemaineEnCours}h
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Relevé déjà validé pour ${worker.prenom} ${worker.nom}`)}
                        className="flex-1 py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-medium cursor-not-allowed"
                      >
                        Relevé validé ✓
                      </button>
                    )}

                    <button
                      onClick={() => showToast(`Demande de prolongation transmise à Sophie Mercier pour ${worker.prenom} ${worker.nom}`)}
                      className="px-3 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-semibold transition"
                      title="Prolonger la mission"
                    >
                      Prolonger
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: HISTORIQUE DES INTÉRIMAIRES */}
        {/* ========================================================= */}
        {activeTab === 'historique' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Historique des délégations & Évaluations</h2>
              <p className="text-xs text-slate-500">Retrouvez tous les intérimaires ayant travaillé sur vos sites, avec vos retours de mission et la possibilité de les rappeler.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Intérimaire & Poste</th>
                      <th className="py-3.5 px-4">Période</th>
                      <th className="py-3.5 px-4 text-center">Volume</th>
                      <th className="py-3.5 px-4">Motif de fin</th>
                      <th className="py-3.5 px-4">Avis & Notation</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_WORKERS_HISTORY.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{h.prenom} {h.nom}</div>
                          <div className="text-xs text-blue-600 font-medium">{h.poste}</div>
                          <span className="text-[10px] font-mono text-slate-400">{h.matricule}</span>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-600">
                          {h.periode}
                        </td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-slate-800 text-xs">
                          {h.totalHeures} h
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${h.motifFin.includes('CDI')
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-600'
                            }`}>
                            {h.motifFin}
                          </span>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="flex items-center gap-1 text-amber-500 text-xs">
                            {'★'.repeat(Math.round(h.evaluationNote))}
                            <span className="font-bold text-slate-700 ml-1">({h.evaluationNote}/5)</span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-2">
                            "{h.evaluationCommentaire}"
                          </p>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => {
                              setIsOrderModalOpen(true);
                              showToast(`Demande de rappel pour ${h.prenom} ${h.nom} pré-remplie !`);
                            }}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold rounded-lg transition"
                          >
                            Redemander ce profil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FACTURES & IMPAYÉS */}
        {/* ========================================================= */}
        {activeTab === 'facturation' && (
          <div className="space-y-6">

            {/* Bannière de situation financière */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total En Attente d'échéance</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{totalEnAttente.toLocaleString('fr-FR')} € TTC</p>
                <p className="text-xs text-slate-500 mt-1">Échéances prévues fin octobre</p>
              </div>

              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-700">Impayés / Échus en retard</span>
                  <span className="px-2 py-0.5 bg-rose-200 text-rose-800 text-[10px] font-bold rounded-full">Action requise</span>
                </div>
                <p className="text-2xl font-black text-rose-700 mt-1">{totalImpayeRetard.toLocaleString('fr-FR')} € TTC</p>
                <p className="text-xs text-rose-600 mt-1">Facture FAC-2026-1031 (19j de retard)</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Règlements honorés en 2026</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{totalPayeAnnee.toLocaleString('fr-FR')} € HT</p>
                <p className="text-xs text-slate-500 mt-1">Paiements réguliers par virement SEPA</p>
              </div>

            </div>

            {/* Filtres des factures */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterInvoiceStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filterInvoiceStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  Toutes ({MOCK_INVOICES.length})
                </button>
                <button
                  onClick={() => setFilterInvoiceStatus('en_retard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filterInvoiceStatus === 'en_retard' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-rose-700 hover:bg-rose-50'
                    }`}
                >
                  Impayées / En retard (1)
                </button>
                <button
                  onClick={() => setFilterInvoiceStatus('en_attente')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filterInvoiceStatus === 'en_attente' ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50'
                    }`}
                >
                  En attente (2)
                </button>
                <button
                  onClick={() => setFilterInvoiceStatus('payee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filterInvoiceStatus === 'payee' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                >
                  Payées (2)
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Paiement par virement : <strong className="text-slate-800">IBAN RHTT disponible sur chaque facture</strong>
              </div>
            </div>

            {/* Tableau des factures */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">N° Pièce</th>
                      <th className="py-3.5 px-4">Émission / Échéance</th>
                      <th className="py-3.5 px-4">Prestation facturée</th>
                      <th className="py-3.5 px-4 text-right">Montant HT</th>
                      <th className="py-3.5 px-4 text-right">Montant TTC</th>
                      <th className="py-3.5 px-4 text-center">Statut</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-4 px-4 font-mono font-bold text-slate-900 text-xs">
                          {inv.numero}
                        </td>
                        <td className="py-4 px-4 text-xs">
                          <p className="text-slate-800 font-medium">Émise le {inv.dateEmission}</p>
                          <p className="text-slate-400 text-[11px]">Échéance : {inv.dateEcheance}</p>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-700 max-w-xs">
                          {inv.objet}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-xs text-slate-700">
                          {inv.montantHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-slate-900 text-xs">
                          {inv.montantTTC.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </td>
                        <td className="py-4 px-4 text-center">
                          {inv.statut === 'payee' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              ✓ Réglée
                            </span>
                          )}
                          {inv.statut === 'en_attente' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                              En attente
                            </span>
                          )}
                          {inv.statut === 'en_retard' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 animate-pulse">
                              Échue ({inv.joursRetard}j)
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedInvoiceDetail(inv)}
                            className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
                          >
                            Détails
                          </button>
                          <button
                            onClick={() => showToast(`Téléchargement de ${inv.numero}.pdf...`)}
                            className="px-2.5 py-1.5 text-xs text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg font-bold transition"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Note d'information de paiement */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <p className="font-bold">Vous avez effectué un virement récemment ?</p>
                <p className="text-blue-700 mt-0.5">
                  Les virements bancaires sont réconciliés automatiquement sous 24 à 48 heures ouvrées. Si votre paiement n'apparaît pas encore comme soldé, vous pouvez transmettre votre preuve de virement à votre chargée de compte ou par email à <strong className="underline">comptabilite@rhtt.fr</strong>.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: COFFRE-FORT DES DOCUMENTS */}
        {/* ========================================================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Coffre-fort Numérique Certifié</h2>
                <p className="text-xs text-slate-500">Archivage sécurisé à valeur probante (Contrats, Bulletins signés, Attestations URSSAF & KBIS).</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchDoc}
                    onChange={(e) => setSearchDoc(e.target.value)}
                    placeholder="Filtrer un document..."
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-60 shadow-xs"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Téléverser un document
                </button>
              </div>
            </div>

            {/* Filtres catégories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterDocCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterDocCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Tous les documents ({MOCK_SAFE_DOCS.length})
              </button>
              <button
                onClick={() => setFilterDocCategory('contrat')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterDocCategory === 'contrat' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Contrats de mise à disposition (2)
              </button>
              <button
                onClick={() => setFilterDocCategory('conformite_legale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterDocCategory === 'conformite_legale' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Conformité & URSSAF RHTT (3)
              </button>
              <button
                onClick={() => setFilterDocCategory('releve_heures')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterDocCategory === 'releve_heures' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Relevés d'heures & Émargement (1)
              </button>
              <button
                onClick={() => setFilterDocCategory('facture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterDocCategory === 'facture' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Factures certifiées (1)
              </button>
            </div>

            {/* Liste des documents */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{doc.nom}</h4>
                        {doc.signeElectronique && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                            ✓ Certifié eIDAS
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                        <span>Ajouté le {doc.dateAjout}</span>
                        <span>•</span>
                        <span>Taille : {doc.taille}</span>
                        {doc.reference && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-500">Réf : {doc.reference}</span>
                          </>
                        )}
                      </div>
                      {doc.certificat && (
                        <p className="text-[11px] text-slate-500 mt-1">
                          🔒 Signature cryptographique : <span className="font-mono text-slate-600">{doc.certificat}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 sm:self-center self-end">
                    <button
                      onClick={() => showToast(`Vérification de l'intégrité de ${doc.nom}... Certificat valide.`)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                    >
                      Vérifier
                    </button>
                    <button
                      onClick={() => showToast(`Téléchargement de ${doc.nom}...`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                    >
                      Télécharger PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DONNÉES ENTREPRISE & ÉQUIPES */}
        {/* ========================================================= */}
        {activeTab === 'profil' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Colonne gauche 2 tiers : Données légales et financières */}
            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Données légales & Facturation</h3>
                    <p className="text-xs text-slate-500">Informations administratives enregistrées sur votre compte RHTT</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Dossier Client Validé
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Raison Sociale</span>
                    <span className="font-bold text-slate-800 text-sm">{CLIENT_DATA.entreprise.raisonSociale}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Numéro SIRET</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{CLIENT_DATA.entreprise.siret}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">N° TVA Intracommunautaire</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{CLIENT_DATA.entreprise.tvaIntra}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Code NAF / Activité</span>
                    <span className="font-medium text-slate-800">{CLIENT_DATA.entreprise.codeNaf}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block mb-0.5">Adresse du siège social & Facturation</span>
                    <span className="font-medium text-slate-800">{CLIENT_DATA.entreprise.adresseSiege}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Conditions de paiement</span>
                    <span className="font-bold text-blue-600">{CLIENT_DATA.entreprise.conditionsReglement}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Plafond encours autorisé</span>
                    <span className="font-bold text-slate-800">{CLIENT_DATA.entreprise.plafondEncours}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span>Une modification sur votre Kbis ou adresse ?</span>
                  <button
                    onClick={() => showToast('Demande de mise à jour transmise à votre chargée de compte.')}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Demander une mise à jour →
                  </button>
                </div>
              </div>

              {/* Utilisateurs autorisés */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Utilisateurs habilités chez {CLIENT_DATA.entreprise.raisonSociale}</h3>
                  <button
                    onClick={() => showToast('Inviter un collaborateur (RH ou chef d’équipe)')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    + Ajouter un utilisateur
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {CLIENT_DATA.equipeInterne.map((user, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{user.nom}</p>
                        <p className="text-xs text-slate-500">{user.role}</p>
                      </div>
                      <div className="text-right text-xs text-slate-600">
                        <p className="font-medium">{user.email}</p>
                        <p className="text-slate-400">{user.tel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Colonne droite 1 tiers : Agence RHTT dédiée */}
            <div className="space-y-6">

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Votre Agence RHTT</h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <p className="font-bold text-slate-800 text-sm">{CLIENT_DATA.conseillerRHTT.agence}</p>
                  <p>📍 {CLIENT_DATA.conseillerRHTT.adresseAgence}</p>
                  <p>📞 Accueil agence : <strong>01 60 29 00 43</strong></p>
                  <p>⏰ Horaires : Du lundi au vendredi de 08h00 à 18h30</p>
                  <p>⚡ Astreinte logistique 24/7 disponible pour les urgences du week-end</p>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-800">Engagements de service :</p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>✓ Réponse garantie sous 2h ouvrées</li>
                    <li>✓ Candidats testés et contrôles de références systématiques</li>
                    <li>✓ Déclarations DPAE envoyées avant la prise de poste</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xs space-y-3">
                <h4 className="font-bold text-sm">Besoin d'un audit de vos plannings ?</h4>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Notre équipe se déplace directement dans vos entrepôts pour adapter les fiches de poste et anticiper vos pics d'activité (Black Friday, inventaires, fêtes).
                </p>
                <button
                  onClick={() => showToast('Demande de rendez-vous sur site enregistrée.')}
                  className="w-full py-2 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-xs transition"
                >
                  Planifier une visite sur site
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODALE 1: COMMANDER UN NOUVEL INTÉRIMAIRE */}
      {/* ========================================================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Commander un intérimaire</h3>
                <p className="text-xs text-slate-500">Formulez votre demande expresse pour une délégation sous 24h.</p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsOrderModalOpen(false);
                showToast('🚀 Demande de délégation transmise avec succès à Sophie Mercier !');
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Métier / Poste recherché *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cariste CACES 3/5, Préparateur..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre de personnes *</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date de début souhaitée *</label>
                  <input
                    type="date"
                    required
                    defaultValue="2026-10-06"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durée estimée *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                    <option>1 semaine</option>
                    <option>2 semaines</option>
                    <option>1 mois</option>
                    <option>3 mois et plus</option>
                    <option>Indéterminée (renfort de pic)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Site d'affectation *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                    <option>Plateforme Pontault-Combault (Quai A/B)</option>
                    <option>Plateforme Torcy Logistique</option>
                    <option>Autre site (préciser en note)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horaires de travail</label>
                  <input
                    type="text"
                    placeholder="Ex: 2x8 (06h-14h ou 14h-22h)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Compétences, CACES ou consignes particulières</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Expérience WMS requise, port des chaussures de sécurité et gilet jaune obligatoires..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  Envoyer la commande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODALE 2: VALIDATION DES RELEVÉS D'HEURES */}
      {/* ========================================================= */}
      {isValidationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Validation des Relevés d'Heures — Semaine en cours</h3>
                <p className="text-xs text-slate-500">Vérifiez les heures saisies avant transmission à la comptabilité paie RHTT.</p>
              </div>
              <button
                onClick={() => setIsValidationModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-1">
              {workers.map((worker) => (
                <div key={worker.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{worker.prenom} {worker.nom} <span className="font-normal text-slate-400">({worker.matricule})</span></p>
                    <p className="text-slate-500">{worker.poste} • {worker.site}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 text-sm">{worker.heuresSemaineEnCours} h</span>
                      <span className="block text-[10px] text-slate-400">Normales : 35h</span>
                    </div>

                    {worker.statutPointage === 'valide' ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs">
                        Validé ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleValidateSingleWorker(worker.id, `${worker.prenom} ${worker.nom}`)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition"
                      >
                        Valider
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Total des heures à valider : <strong>{workers.reduce((s, w) => s + w.heuresSemaineEnCours, 0)} h</strong>
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsValidationModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={handleValidateAllTimesheets}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Tout valider en 1 clic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODALE 3: DÉTAIL D'UNE FACTURE */}
      {/* ========================================================= */}
      {selectedInvoiceDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{selectedInvoiceDetail.numero}</span>
                <h3 className="text-lg font-black text-slate-900">Détail de la facture</h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-800">{selectedInvoiceDetail.objet}</p>
                <p className="text-slate-500">Date d'émission : {selectedInvoiceDetail.dateEmission} | Échéance : {selectedInvoiceDetail.dateEcheance}</p>
              </div>

              <div className="space-y-2 border-t border-b border-slate-100 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Montant net Hors Taxes :</span>
                  <span className="font-mono font-bold text-slate-800">{selectedInvoiceDetail.montantHT.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TVA (20.0%) :</span>
                  <span className="font-mono text-slate-800">{(selectedInvoiceDetail.montantTTC - selectedInvoiceDetail.montantHT).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900">Total Net TTC à payer :</span>
                  <span className="font-mono font-black text-blue-700 text-base">{selectedInvoiceDetail.montantTTC.toFixed(2)} €</span>
                </div>
              </div>

              {selectedInvoiceDetail.statut === 'en_retard' ? (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
                  <p className="font-bold">⚠️ Facture en retard de paiement ({selectedInvoiceDetail.joursRetard} jours)</p>
                  <p className="text-[11px] text-rose-700 mt-1">Merci de procéder au virement dès aujourd'hui sur l'IBAN RHTT ou de nous adresser le justificatif de transaction.</p>
                </div>
              ) : selectedInvoiceDetail.statut === 'payee' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
                  <p className="font-bold">✓ Facture totalement réglée</p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
                  <p className="font-bold">Facture en attente d'échéance ({selectedInvoiceDetail.dateEcheance})</p>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceDetail(null)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Téléchargement du duplicata PDF ${selectedInvoiceDetail.numero}...`);
                    setSelectedInvoiceDetail(null);
                  }}
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  Télécharger le PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODALE 4: TÉLÉVERSER UN DOCUMENT */}
      {/* ========================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">Déposer un document dans le coffre-fort</h3>
                <p className="text-xs text-slate-500">Transmettez vos bons de commande, protocoles ou consignes de sécurité.</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploadModalOpen(false);
                showToast('📁 Document téléversé et crypté avec succès dans votre coffre-fort !');
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Catégorie du document *</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                  <option>Bon de commande / Accord de mission</option>
                  <option>Protocole de sécurité & Consignes d’accueil</option>
                  <option>Relevé d’heures / Feuille d’émargement manuelle</option>
                  <option>Preuve de virement bancaire</option>
                  <option>Autre justificatif</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Intitulé du fichier *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Protocole_Sécurité_Entrepôt_QuaiA_2026.pdf"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50 cursor-pointer transition">
                <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="font-bold text-slate-700">Glissez-déposez votre fichier PDF ou image ici</p>
                <p className="text-[11px] text-slate-400 mt-1">Formats acceptés : PDF, PNG, JPG jusqu'à 20 Mo</p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  Téléverser le document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
