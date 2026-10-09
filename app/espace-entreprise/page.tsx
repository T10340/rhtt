'use client';

import { useState, useId } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';

// Structure d'une offre d'emploi postée par l'entreprise
export interface EnterpriseJobOffer {
  id: string;
  reference: string;
  title: string;
  category: string;
  contractType: string;
  location: string;
  startDate: string;
  duration: string;
  salary: string;
  salaryType: 'horaire' | 'mensuel' | 'annuel';
  salaryAdvantages: string[];
  schedule: string;
  positionsCount: number;
  urgency: 'urgent' | 'normal' | 'anticipation';
  descriptifPoste: string;
  profilRecherche: string;
  qualification: string;
  experienceLevel: string;
  status: 'active' | 'draft' | 'closed';
  createdAt: string;
  candidaturesCount: number;
}

// Candidature reçue sur une offre
export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  qualification: string;
  experience: string;
  dateApplication: string;
  status: 'nouveau' | 'en_cours' | 'retenu' | 'refuse';
  cvFile: string;
}

// Données initiales d'offres postées pour l'entreprise
const INITIAL_ENTERPRISE_JOBS: EnterpriseJobOffer[] = [
  {
    id: 'ENT-201',
    reference: 'RHTT-ENT-201',
    title: 'Cariste d’entrepôt CACES 1-3-5 (H/F)',
    category: 'Transport & Logistique',
    contractType: 'Intérim',
    location: 'Pontault-Combault (77)',
    startDate: 'Dès que possible',
    duration: '3 mois renouvelable (mission longue)',
    salary: '13,85 € - 14,50 € /h',
    salaryType: 'horaire',
    salaryAdvantages: ['+ 10% IFM', '+ 10% Congés Payés (ICCP)', 'Panier repas (10,10 €/j)', 'Primes d’équipe 2x8'],
    schedule: '2x8 (Matin: 06h-13h30 / Après-midi: 13h30-21h)',
    positionsCount: 3,
    urgency: 'urgent',
    descriptifPoste: "Sous la direction du responsable logistique, vous prendrez en charge le déchargement des camions de fret, le gerbage des palettes en palettier grande hauteur (hauteur 8m) et le réapprovisionnement des alvéoles de préparation.\n\nVous veillerez scrupuleusement au respect des règles de sécurité et au contrôle qualitatif des marchandises reçues.",
    profilRecherche: "Titulaire impératif des CACES R489 1A, 3 et 5 avec visite médicale à jour.\nPremière expérience réussie en plateforme logistique souhaitée (1 an minimum).\nDynamisme, ponctualité et rigueur.",
    qualification: 'CACES R489 1A/3/5',
    experienceLevel: '1 à 2 ans',
    status: 'active',
    createdAt: '07/10/2026',
    candidaturesCount: 8,
  },
  {
    id: 'ENT-202',
    reference: 'RHTT-ENT-202',
    title: 'Préparateur de commandes avec CACES 1B (H/F)',
    category: 'Transport & Logistique',
    contractType: 'Intérim',
    location: 'Torcy (77)',
    startDate: '19/10/2026',
    duration: '2 mois (renfort pic d’activité automne)',
    salary: '12,90 € /h + Primes productivité',
    salaryType: 'horaire',
    salaryAdvantages: ['+ 10% IFM', '+ 10% ICCP', 'Primes de cadencement'],
    schedule: 'Journée normale (08h30 - 16h30)',
    positionsCount: 4,
    urgency: 'normal',
    descriptifPoste: "Prélèvement manuel et informatisé des colis via terminal radiofréquence / commande vocale.\nMontage de palettes équilibrées, filmage et étiquetage pour expédition client.",
    profilRecherche: "CACES 1B souhaité mais débutants motivés acceptés.\nBonne condition physique et capacité à travailler en équipe.",
    qualification: 'CACES R489 1B',
    experienceLevel: 'Débutant accepté',
    status: 'active',
    createdAt: '05/10/2026',
    candidaturesCount: 6,
  },
  {
    id: 'ENT-203',
    reference: 'RHTT-ENT-203',
    title: 'Chef d’équipe Quai / Expéditions (H/F)',
    category: 'Transport & Logistique',
    contractType: 'CDI',
    location: 'Roissy-en-France (95)',
    startDate: '01/11/2026',
    duration: 'Contrat à durée indéterminée',
    salary: '2 800 € - 3 200 € / mois',
    salaryType: 'mensuel',
    salaryAdvantages: ['13ème mois', 'Mutuelle d’entreprise', 'Prime sur objectifs'],
    schedule: 'Horaires postés (Planning mensuel)',
    positionsCount: 1,
    urgency: 'anticipation',
    descriptifPoste: "Supervision d'une équipe de 15 magasiniers et caristes. Planification des tournées de chargement, gestion des litiges transporteurs et reporting quotidien des indicateurs de performance (OTD, productivité).",
    profilRecherche: "Expérience confirmée d'au moins 3 ans en management logistique quai.\nMaîtrise d'un WMS moderne (Manhattan, SAP ou Reflex).",
    qualification: 'Bac+2 Logistique / Transport',
    experienceLevel: '3 ans et plus',
    status: 'active',
    createdAt: '01/10/2026',
    candidaturesCount: 4,
  },
  {
    id: 'ENT-204',
    reference: 'RHTT-ENT-204',
    title: 'Technicien de Maintenance Convoyeurs (H/F)',
    category: 'Industrie & Maintenance',
    contractType: 'Intérim',
    location: 'Pontault-Combault (77)',
    startDate: '12/10/2026',
    duration: '6 mois (pré-embauche CDI possible)',
    salary: '16,50 € /h + Primes astreinte',
    salaryType: 'horaire',
    salaryAdvantages: ['+ 10% IFM', '+ 10% ICCP', 'Panier', 'Véhicule de service'],
    schedule: '2x8 avec roulement astreinte',
    positionsCount: 1,
    urgency: 'urgent',
    descriptifPoste: "Maintenance préventive et curative des lignes de tri automatisées, trieurs optiques et convoyeurs à rouleaux.\nDiagnostic électrique et mécanique immédiat en cas de blocage de chaîne.",
    profilRecherche: "BTS Électrotechnique ou Maintenance Industrielle.\nHabilitations électriques BR/B2V à jour.",
    qualification: 'Habilitation BR/B2V',
    experienceLevel: '2 ans minimum',
    status: 'draft',
    createdAt: '08/10/2026',
    candidaturesCount: 0,
  },
];

// Candidatures de démonstration
const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'CAND-01',
    jobId: 'ENT-201',
    jobTitle: 'Cariste d’entrepôt CACES 1-3-5 (H/F)',
    candidateName: 'Mamadou Diop',
    candidateEmail: 'm.diop@email.fr',
    candidatePhone: '06 14 25 36 47',
    qualification: 'CACES R489 1A, 3, 5 certifiés Dekra',
    experience: '3 ans chez Geodis & XPO Logistics',
    dateApplication: '08/10/2026 à 14h20',
    status: 'en_cours',
    cvFile: 'CV_Mamadou_Diop_Cariste.pdf',
  },
  {
    id: 'CAND-02',
    jobId: 'ENT-201',
    jobTitle: 'Cariste d’entrepôt CACES 1-3-5 (H/F)',
    candidateName: 'Julien Lefebvre',
    candidateEmail: 'julien.l@email.fr',
    candidatePhone: '07 88 90 12 34',
    qualification: 'CACES 3 & 5 à jour, visite médicale 09/2026',
    experience: '2 ans en logistique alimentaire surgelée',
    dateApplication: '08/10/2026 à 10h15',
    status: 'nouveau',
    cvFile: 'CV_Julien_Lefebvre.pdf',
  },
  {
    id: 'CAND-03',
    jobId: 'ENT-202',
    jobTitle: 'Préparateur de commandes avec CACES 1B (H/F)',
    candidateName: 'Sarah Khelifi',
    candidateEmail: 'sarah.khelifi@email.fr',
    candidatePhone: '06 52 41 89 70',
    qualification: 'CACES 1B + Expérience commande vocale',
    experience: '18 mois en drive e-commerce',
    dateApplication: '07/10/2026 à 16h45',
    status: 'retenu',
    cvFile: 'CV_Sarah_Khelifi.pdf',
  },
  {
    id: 'CAND-04',
    jobId: 'ENT-203',
    jobTitle: 'Chef d’équipe Quai / Expéditions (H/F)',
    candidateName: 'David Morin',
    candidateEmail: 'd.morin.log@email.fr',
    candidatePhone: '06 29 45 80 11',
    qualification: 'DUT GLT (Gestion Logistique & Transport)',
    experience: '5 ans chef de quai chez Chronopost Hub',
    dateApplication: '06/10/2026 à 11h00',
    status: 'en_cours',
    cvFile: 'CV_David_Morin_ChefQuai.pdf',
  },
];

// Modèles rapides pour pré-remplir l'éditeur
const JOB_TEMPLATES = [
  {
    label: 'Cariste CACES 1-3-5',
    title: 'Cariste d’entrepôt CACES 1-3-5 (H/F)',
    category: 'Transport & Logistique',
    contractType: 'Intérim',
    duration: '3 mois renouvelable',
    salary: '13,85 € - 14,50 € /h',
    schedule: '2x8 (06h-13h30 / 13h30-21h)',
    qualification: 'CACES R489 1A/3/5',
    descriptifPoste: 'Chargement/déchargement de camions, gerbage grande hauteur et réapprovisionnement des lignes de préparation.',
    profilRecherche: 'Titulaire CACES 1-3-5 valide avec visite médicale à jour. Rigueur et sens de la sécurité.',
  },
  {
    label: 'Maçon Coffreur BTP',
    title: 'Maçon Coffreur / Bancheur N3P2 (H/F)',
    category: 'BTP & Construction',
    contractType: 'Intérim',
    duration: 'Mission de 6 mois sur chantier',
    salary: '15,20 € - 16,50 € /h + Paniers',
    schedule: 'Journée continue chantier (39h)',
    qualification: 'N3P2 / Carte BTP',
    descriptifPoste: 'Mise en place de banches, coulage béton armé, coffrage traditionnel bois/métal sur grand chantier.',
    profilRecherche: 'Expérience confirmée de 3 ans en gros œuvre. Carte BTP active.',
  },
  {
    label: 'Préparateur de commandes',
    title: 'Préparateur de commandes vocale CACES 1 (H/F)',
    category: 'Transport & Logistique',
    contractType: 'Intérim',
    duration: '1 à 2 mois',
    salary: '12,80 € /h + Primes',
    schedule: 'Journée normale (35h)',
    qualification: 'CACES R489 1B',
    descriptifPoste: 'Prélèvement colis par guidage vocal, constitution de palettes et filmage.',
    profilRecherche: 'Dynamique, réactif et ponctuel. Débutants acceptés.',
  },
  {
    label: 'Assistant(e) ADV Bilingue',
    title: 'Assistant(e) Administration des Ventes (ADV) Bilingue',
    category: 'Tertiaire & Services',
    contractType: 'CDI',
    duration: 'CDI - Poste pérenne',
    salary: '32 000 € - 36 000 € / an',
    schedule: 'Cadre 37h avec RTT',
    qualification: 'Bac+2 minimum / Anglais courant',
    descriptifPoste: 'Saisie des commandes clients, facturation, suivi logistique des expéditions et gestion de la relation internationale.',
    profilRecherche: 'Bac+2 gestion ou commerce, maîtrise de l’anglais professionnel et aisance sur ERP.',
  },
];

export default function EspaceEntreprisePage() {
  // Navigation par onglet
  const [activeTab, setActiveTab] = useState<'editor' | 'my-jobs' | 'candidates' | 'profile'>('editor');

  // Liste des offres de l'entreprise
  const [jobs, setJobs] = useState<EnterpriseJobOffer[]>(INITIAL_ENTERPRISE_JOBS);
  const [applications, setApplications] = useState<CandidateApplication[]>(INITIAL_APPLICATIONS);

  // État du formulaire de l'éditeur
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Transport & Logistique');
  const [contractType, setContractType] = useState('Intérim');
  const [location, setLocation] = useState('Pontault-Combault (77)');
  const [startDate, setStartDate] = useState('');
  const [isImmediateStart, setIsImmediateStart] = useState(true);
  const [duration, setDuration] = useState('3 mois renouvelable');
  const [salaryAmount, setSalaryAmount] = useState('13,85 € - 14,50 € /h');
  const [salaryType, setSalaryType] = useState<'horaire' | 'mensuel' | 'annuel'>('horaire');
  const [salaryAdvantages, setSalaryAdvantages] = useState<string[]>([
    '+ 10% IFM',
    '+ 10% Congés Payés (ICCP)',
    'Panier repas conventionnel',
  ]);
  const [advantageInput, setAdvantageInput] = useState('');
  const [schedule, setSchedule] = useState('Temps plein 35h');
  const [positionsCount, setPositionsCount] = useState<number>(2);
  const [urgency, setUrgency] = useState<'urgent' | 'normal' | 'anticipation'>('normal');
  const [qualification, setQualification] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('1 à 2 ans');
  const [descriptifPoste, setDescriptifPoste] = useState('');
  const [profilRecherche, setProfilRecherche] = useState('');

  // États UI (Notifications & Modal d'aperçu)
  const [notification, setNotification] = useState<string | null>(null);
  const [previewJob, setPreviewJob] = useState<EnterpriseJobOffer | null>(null);
  const [candidateFilterJobId, setCandidateFilterJobId] = useState<string>('all');

  // Application d'un modèle prédéfini
  const applyTemplate = (tpl: typeof JOB_TEMPLATES[0]) => {
    setTitle(tpl.title);
    setCategory(tpl.category);
    setContractType(tpl.contractType);
    setDuration(tpl.duration);
    setSalaryAmount(tpl.salary);
    setSchedule(tpl.schedule);
    setQualification(tpl.qualification);
    setDescriptifPoste(tpl.descriptifPoste);
    setProfilRecherche(tpl.profilRecherche);
    showNotice(`Modèle "${tpl.label}" chargé dans l'éditeur.`);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setEditingJobId(null);
    setTitle('');
    setCategory('Transport & Logistique');
    setContractType('Intérim');
    setLocation('Pontault-Combault (77)');
    setStartDate('');
    setIsImmediateStart(true);
    setDuration('3 mois renouvelable');
    setSalaryAmount('13,85 € /h');
    setSalaryType('horaire');
    setSalaryAdvantages(['+ 10% IFM', '+ 10% Congés Payés (ICCP)', 'Panier repas conventionnel']);
    setSchedule('Temps plein 35h');
    setPositionsCount(1);
    setUrgency('normal');
    setQualification('');
    setExperienceLevel('1 à 2 ans');
    setDescriptifPoste('');
    setProfilRecherche('');
  };

  // Notification flash
  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Basculer un avantage salarial
  const toggleAdvantage = (adv: string) => {
    if (salaryAdvantages.includes(adv)) {
      setSalaryAdvantages(salaryAdvantages.filter((a) => a !== adv));
    } else {
      setSalaryAdvantages([...salaryAdvantages, adv]);
    }
  };

  const addCustomAdvantage = () => {
    if (advantageInput.trim() && !salaryAdvantages.includes(advantageInput.trim())) {
      setSalaryAdvantages([...salaryAdvantages, advantageInput.trim()]);
      setAdvantageInput('');
    }
  };

  // Charger une offre existante dans l'éditeur
  const handleEditJob = (job: EnterpriseJobOffer) => {
    setEditingJobId(job.id);
    setTitle(job.title);
    setCategory(job.category);
    setContractType(job.contractType);
    setLocation(job.location);
    if (job.startDate === 'Dès que possible') {
      setIsImmediateStart(true);
      setStartDate('');
    } else {
      setIsImmediateStart(false);
      setStartDate(job.startDate);
    }
    setDuration(job.duration);
    setSalaryAmount(job.salary);
    setSalaryType(job.salaryType);
    setSalaryAdvantages(job.salaryAdvantages);
    setSchedule(job.schedule);
    setPositionsCount(job.positionsCount);
    setUrgency(job.urgency);
    setQualification(job.qualification);
    setExperienceLevel(job.experienceLevel);
    setDescriptifPoste(job.descriptifPoste);
    setProfilRecherche(job.profilRecherche);
    setActiveTab('editor');
    showNotice(`Édition de l'offre "${job.title}" activée.`);
  };

  // Dupliquer une offre
  const handleDuplicateJob = (job: EnterpriseJobOffer) => {
    const duplicated: EnterpriseJobOffer = {
      ...job,
      id: `ENT-${Date.now().toString().slice(-4)}`,
      reference: `RHTT-ENT-${Math.floor(100 + Math.random() * 900)}`,
      title: `${job.title} (Copie)`,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      candidaturesCount: 0,
      status: 'draft',
    };
    setJobs([duplicated, ...jobs]);
    showNotice(`Offre dupliquée en tant que brouillon : "${duplicated.title}".`);
  };

  // Mettre à jour le statut d'une offre (Activer / Mettre en pause / Clôturer)
  const handleToggleJobStatus = (jobId: string, newStatus: 'active' | 'draft' | 'closed') => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));
    showNotice(`Statut de l'offre mis à jour : ${newStatus.toUpperCase()}`);
  };

  // Soumission du formulaire (Publication ou Brouillon)
  const handleSubmitJob = (targetStatus: 'active' | 'draft') => {
    if (!title.trim()) {
      alert('Veuillez renseigner un intitulé de poste.');
      return;
    }

    const calculatedStartDate = isImmediateStart ? 'Dès que possible' : (startDate || 'Dès que possible');

    if (editingJobId) {
      // Mise à jour de l'offre existante
      setJobs(
        jobs.map((j) => {
          if (j.id === editingJobId) {
            return {
              ...j,
              title: title.trim(),
              category,
              contractType,
              location,
              startDate: calculatedStartDate,
              duration,
              salary: salaryAmount,
              salaryType,
              salaryAdvantages,
              schedule,
              positionsCount,
              urgency,
              qualification,
              experienceLevel,
              descriptifPoste,
              profilRecherche,
              status: targetStatus,
            };
          }
          return j;
        })
      );
      showNotice(
        targetStatus === 'active'
          ? `L'offre "${title}" a été mise à jour et publiée en ligne !`
          : `L'offre "${title}" a été enregistrée en brouillon.`
      );
    } else {
      // Nouvelle offre créée
      const newJob: EnterpriseJobOffer = {
        id: `ENT-${Date.now().toString().slice(-4)}`,
        reference: `RHTT-ENT-${Math.floor(100 + Math.random() * 900)}`,
        title: title.trim(),
        category,
        contractType,
        location,
        startDate: calculatedStartDate,
        duration,
        salary: salaryAmount,
        salaryType,
        salaryAdvantages,
        schedule,
        positionsCount,
        urgency,
        qualification,
        experienceLevel,
        descriptifPoste,
        profilRecherche,
        status: targetStatus,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        candidaturesCount: 0,
      };

      setJobs([newJob, ...jobs]);
      showNotice(
        targetStatus === 'active'
          ? `Votre offre "${newJob.title}" est maintenant EN LIGNE sur le site RHTT !`
          : `Votre offre "${newJob.title}" a été enregistrée comme brouillon.`
      );
    }

    resetForm();
    setActiveTab('my-jobs');
  };

  // Générer l'objet d'aperçu temps réel basé sur le formulaire en cours
  const currentFormPreviewJob: EnterpriseJobOffer = {
    id: editingJobId || 'PREVIEW-TEMP',
    reference: 'RHTT-ENT-PREVIEW',
    title: title || 'Intitulé de poste (Aperçu)',
    category,
    contractType,
    location: location || 'Île-de-France',
    startDate: isImmediateStart ? 'Dès que possible' : (startDate || 'À convenir'),
    duration: duration || 'Durée de la mission',
    salary: salaryAmount || 'Rémunération selon profil',
    salaryType,
    salaryAdvantages,
    schedule: schedule || 'Temps plein',
    positionsCount,
    urgency,
    qualification: qualification || 'Non spécifié',
    experienceLevel,
    descriptifPoste: descriptifPoste || "Le descriptif détaillé de la mission apparaîtra ici...",
    profilRecherche: profilRecherche || "Les compétences et habilitations requises apparaîtront ici...",
    status: 'active',
    createdAt: new Date().toLocaleDateString('fr-FR'),
    candidaturesCount: 0,
  };

  // Filtrer les candidatures selon l'offre sélectionnée
  const filteredApplications = applications.filter((app) =>
    candidateFilterJobId === 'all' ? true : app.jobId === candidateFilterJobId
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header />

      {/* ========================================================= */}
      {/* 1. BANDEAU DE BIENVENUE / CONTEXTE ENTREPRISE CLIENTE     */}
      {/* ========================================================= */}
      <section className="bg-slate-950 text-white border-b border-slate-900 relative overflow-hidden">
        {/* Halos aux couleurs de marque */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rhtt-violet/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rhtt-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Identité Entreprise */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rhtt-violet-500/20 text-purple-300 border border-rhtt-violet-500/30">
                  <span className="w-2 h-2 rounded-full bg-rhtt-orange animate-pulse" />
                  Espace Recruteur Partenaire
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                  Compte N° CLI-8842
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ✓ Recruteur Vérifié
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  LogistiX Hub France <span className="text-rhtt-orange">SAS</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>📍 Site principal : Pontault-Combault (77)</span>
                  <span>•</span>
                  <span>Interlocutrice RHTT dédiée : <strong className="text-rhtt-orange font-medium">Sophie Mercier</strong> (01 60 29 00 45)</span>
                </p>
              </div>
            </div>

            {/* Actions Rapides en-tête */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('editor');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-rhtt-orange hover:bg-rhtt-orange-600 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-rhtt-orange/25 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Poster une offre d'emploi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('my-jobs')}
                className="inline-flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-sm font-semibold transition active:scale-95 cursor-pointer"
              >
                <span>Gérer mes annonces</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rhtt-violet text-white">
                  {jobs.filter((j) => j.status === 'active').length}
                </span>
              </button>
            </div>

          </div>

          {/* Cartes KPI synthétiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-900">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Offres en ligne
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {jobs.filter((j) => j.status === 'active').length}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">actives</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Candidatures reçues
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-rhtt-orange">
                  {applications.length}
                </span>
                <span className="text-xs text-slate-400">candidats</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Délai de pourvoi RHTT
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">24h</span>
                <span className="text-xs text-purple-300 font-medium">réactivité</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Postes comblés en 2026
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">42</span>
                <span className="text-xs text-emerald-400 font-semibold">missions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-md text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-white/80 hover:text-white text-xs font-bold p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. BARRE D'ONGLETS DE NAVIGATION DU PORTAIL               */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-slate-200 sticky top-18 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar py-2">
            
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`py-3 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-rhtt-violet-50 text-rhtt-violet border border-rhtt-violet-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>✍️</span>
              <span>{editingJobId ? "Modifier l'offre" : "Poster une offre d'emploi"}</span>
              {editingJobId && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800">Édition</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('my-jobs')}
              className={`py-3 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'my-jobs'
                  ? 'bg-rhtt-violet-50 text-rhtt-violet border border-rhtt-violet-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>📋</span>
              <span>Mes annonces publiées</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {jobs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('candidates')}
              className={`py-3 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'candidates'
                  ? 'bg-rhtt-violet-50 text-rhtt-violet border border-rhtt-violet-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>👥</span>
              <span>Candidatures reçues</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rhtt-orange-100 text-rhtt-orange-800">
                {applications.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`py-3 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-rhtt-violet-50 text-rhtt-violet border border-rhtt-violet-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>🏢</span>
              <span>Profil Entreprise & Facturation</span>
            </button>

          </nav>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CONTENU PRINCIPAL SELON L'ONGLET SÉLECTIONNÉ           */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* ------------------------------------------------------- */}
        {/* ONGLET 1 : ÉDITEUR D'OFFRE D'EMPLOI COMPLET             */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'editor' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Barre de contrôle de l'éditeur & Modèles rapides */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {editingJobId ? "Modifier l'offre d'emploi" : "Créer et publier une offre d'emploi"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Remplissez les détails de la mission. Votre offre sera immédiatement visible par les candidats et prise en charge par l'équipe RHTT.
                </p>
              </div>

              {/* Boutons d'action rapides */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setPreviewJob(currentFormPreviewJob)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>👁️</span>
                  <span>Aperçu candidat</span>
                </button>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Annuler l'édition
                  </button>
                )}
              </div>
            </div>

            {/* Sélecteur de modèles fréquents */}
            <div className="bg-rhtt-violet-50/60 border border-rhtt-violet-100 rounded-2xl p-4 sm:p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-rhtt-violet-800 block mb-2">
                ⚡ Gagnez du temps : Charger un modèle d'offre type
              </span>
              <div className="flex flex-wrap gap-2">
                {JOB_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.label}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="px-3 py-1.5 bg-white hover:bg-rhtt-violet hover:text-white text-rhtt-violet-800 text-xs font-semibold rounded-xl border border-rhtt-violet-200 transition shadow-2xs cursor-pointer active:scale-95"
                  >
                    + {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FORMULAIRE PRINCIPAL DE L'ÉDITEUR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitJob('active');
              }}
              className="space-y-6"
            >
              
              {/* SECTION 1 : TITRE, SECTEUR ET CONTRAT */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rhtt-violet text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="text-base font-bold text-slate-900">Poste & Type de mission</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Éditeur de Titre */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Intitulé du poste <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Ex: Cariste d’entrepôt CACES 1-3-5 (H/F), Électricien tertiaire..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet transition shadow-2xs"
                    />
                  </div>

                  {/* Secteur d'activité */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Secteur d'activité
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    >
                      <option value="Transport & Logistique">🚚 Transport & Logistique</option>
                      <option value="BTP & Construction">🏗️ BTP & Construction</option>
                      <option value="Tertiaire & Services">🏢 Tertiaire & Services</option>
                      <option value="Industrie & Maintenance">⚙️ Industrie & Maintenance</option>
                    </select>
                  </div>

                  {/* Type de contrat */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Type de contrat
                    </label>
                    <select
                      value={contractType}
                      onChange={(e) => setContractType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    >
                      <option value="Intérim">Intérim (Travail Temporaire)</option>
                      <option value="Intérim (Pré-embauche CDI)">Intérim avec tremplin CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="CDI">CDI</option>
                      <option value="Vacation">Vacation / Extra</option>
                    </select>
                  </div>

                  {/* Nombre de postes & Degré d'urgence */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Nombre de postes à pourvoir
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={positionsCount}
                      onChange={(e) => setPositionsCount(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Degré d'urgence
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency('urgent')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition ${
                          urgency === 'urgent'
                            ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-500'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        ⚡ Urgent (&lt;24h)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('normal')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition ${
                          urgency === 'normal'
                            ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-500'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('anticipation')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition ${
                          urgency === 'anticipation'
                            ? 'bg-purple-50 border-purple-300 text-purple-700 ring-2 ring-purple-500'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Anticipation
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 2 : CALENDRIER, DATES & DURÉE DE MISSION */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rhtt-violet text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="text-base font-bold text-slate-900">Dates, Durée de mission & Horaires</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Date de début */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Date de début de mission <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-2 rounded-xl cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isImmediateStart}
                            onChange={(e) => setIsImmediateStart(e.target.checked)}
                            className="rounded text-rhtt-violet focus:ring-rhtt-violet"
                          />
                          <span>Démarrage immédiat / Dès que possible</span>
                        </label>
                      </div>

                      {!isImmediateStart && (
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Durée de la mission */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Durée de la mission <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      placeholder="Ex : 1 semaine, 3 mois renouvelable, 6 mois..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    />
                  </div>

                  {/* Lieu d'affectation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Ville / Lieu d'affectation <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      placeholder="Ex: Pontault-Combault (77), Paris (75), Roissy (95)..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    />
                  </div>

                  {/* Organisation des horaires */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Horaires de travail
                    </label>
                    <input
                      type="text"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      placeholder="Ex: Journée (35h), 2x8 (matin/après-midi), Nuit, Week-end..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    />
                  </div>

                </div>
              </div>

              {/* SECTION 3 : ÉDITEUR DE RÉMUNÉRATION & AVANTAGES */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rhtt-violet text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="text-base font-bold text-slate-900">Rémunération & Avantages</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Montant rémunération */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Montant ou fourchette <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={salaryAmount}
                      onChange={(e) => setSalaryAmount(e.target.value)}
                      required
                      placeholder="Ex: 13,85 € - 14,50 € /h, 2 400 € / mois, À négocier..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-rhtt-violet-800 bg-rhtt-violet-50/30 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                    />
                  </div>

                  {/* Base de calcul */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Base de calcul
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSalaryType('horaire')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition ${
                          salaryType === 'horaire'
                            ? 'bg-rhtt-violet text-white border-rhtt-violet'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Horaire (€/h)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSalaryType('mensuel')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition ${
                          salaryType === 'mensuel'
                            ? 'bg-rhtt-violet text-white border-rhtt-violet'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Mensuel (€/mois)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSalaryType('annuel')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition ${
                          salaryType === 'annuel'
                            ? 'bg-rhtt-violet text-white border-rhtt-violet'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Annuel (K€)
                      </button>
                    </div>
                  </div>

                  {/* Avantages et primes cochables */}
                  <div className="md:col-span-2 space-y-3">
                    <span className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Primes & Avantages conventionnels
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '+ 10% IFM',
                        '+ 10% Congés Payés (ICCP)',
                        'Panier repas conventionnel',
                        'Indemnité transport / Navigo',
                        'Primes d’équipe (2x8)',
                        'Majoration heures de nuit',
                        '13ème mois',
                        'Prime d’habillage',
                      ].map((adv) => {
                        const checked = salaryAdvantages.includes(adv);
                        return (
                          <button
                            key={adv}
                            type="button"
                            onClick={() => toggleAdvantage(adv)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                              checked
                                ? 'bg-rhtt-violet-50 text-rhtt-violet-800 border-rhtt-violet-300'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span>{checked ? '✓' : '+'}</span>
                            <span>{adv}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Ajout d'avantage personnalisé */}
                    <div className="flex gap-2 max-w-md pt-1">
                      <input
                        type="text"
                        value={advantageInput}
                        onChange={(e) => setAdvantageInput(e.target.value)}
                        placeholder="Autre prime (ex: Prime de froid 1,50€/h)..."
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rhtt-violet"
                      />
                      <button
                        type="button"
                        onClick={addCustomAdvantage}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 4 : ÉDITEUR DE TEXTE / DESCRIPTIF DU POSTE & PROFIL RECHERCHÉ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rhtt-violet text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="text-base font-bold text-slate-900">Missions & Profil candidat recherché</h3>
                </div>

                <div className="space-y-6">
                  
                  {/* Éditeur de texte : Descriptif du poste */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Descriptif des missions & tâches quotidiennes <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      value={descriptifPoste}
                      onChange={(e) => setDescriptifPoste(e.target.value)}
                      required
                      placeholder="Détaillez le rôle de l'intérimaire : opérations quotidiennes, environnement de travail, responsabilités..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet transition shadow-2xs font-sans"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Conseil : Décrivez 3 à 5 missions précises pour attirer les candidats les plus qualifiés.
                    </span>
                  </div>

                  {/* Profil recherché */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Profil recherché, compétences & habilitations <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={profilRecherche}
                      onChange={(e) => setProfilRecherche(e.target.value)}
                      required
                      placeholder="Précisez les qualités attendues, habilitations nécessaires (ex: CACES R489, Carte BTP, Permis CE), savoir-être..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet transition shadow-2xs font-sans"
                    />
                  </div>

                  {/* Qualifications & Expérience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Habilitations clés (CACES, Cartes...)
                      </label>
                      <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="Ex: CACES 1-3-5, N3P2, Habilitation BR..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Expérience minimum
                      </label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rhtt-violet shadow-2xs"
                      >
                        <option value="Débutant accepté">Débutant accepté (Formation assurée)</option>
                        <option value="6 mois à 1 an">6 mois à 1 an</option>
                        <option value="1 à 2 ans">1 à 2 ans</option>
                        <option value="3 ans et plus">3 ans et plus (Confirmé)</option>
                        <option value="5 ans et plus">5 ans et plus (Expert)</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* BARRE D'ACTIONS DE SOUMISSION */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-30">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  <span>ℹ️ L'offre sera visible sur la page d'accueil et le moteur de recherche RHTT.</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setPreviewJob(currentFormPreviewJob)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition active:scale-95 cursor-pointer"
                  >
                    Aperçu candidat
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmitJob('draft')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition active:scale-95 cursor-pointer"
                  >
                    Sauvegarder en brouillon
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rhtt-orange hover:bg-rhtt-orange-600 text-white text-sm font-black shadow-lg shadow-rhtt-orange/25 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>{editingJobId ? "Enregistrer les modifications" : "Publier l'offre d'emploi"}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ONGLET 2 : GESTION DES ANNONCES PUBLIÉES               */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'my-jobs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">Mes offres d'emploi ({jobs.length})</h2>
                <p className="text-xs text-slate-500">Suivez le statut de vos publications et traitez les candidatures reçues.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('editor');
                }}
                className="px-4 py-2.5 bg-rhtt-orange hover:bg-rhtt-orange-600 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer self-start sm:self-auto"
              >
                + Nouvelle offre
              </button>
            </div>

            {/* Grille des offres de l'entreprise */}
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rhtt-violet-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Statut Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          job.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : job.status === 'draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {job.status === 'active' ? '● En ligne' : job.status === 'draft' ? '○ Brouillon' : 'Clôturée'}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rhtt-violet-50 text-rhtt-violet-700 border border-rhtt-violet-200">
                        {job.contractType}
                      </span>

                      <span className="text-xs text-slate-400 font-mono">
                        Réf : {job.reference}
                      </span>

                      <span className="text-xs text-slate-400">
                        Créée le {job.createdAt}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>🗓️ Début : <strong className="text-slate-800">{job.startDate}</strong></span>
                      <span>•</span>
                      <span>⏳ Durée : {job.duration}</span>
                      <span>•</span>
                      <span className="font-mono font-bold text-rhtt-violet-800 bg-rhtt-violet-50 px-2 py-0.5 rounded">
                        💶 {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Candidatures */}
                  <div className="flex flex-wrap items-center gap-2.5 lg:self-center border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    
                    {/* Badge candidatures */}
                    <button
                      type="button"
                      onClick={() => {
                        setCandidateFilterJobId(job.id);
                        setActiveTab('candidates');
                      }}
                      className="px-3 py-2 bg-rhtt-orange-50 hover:bg-rhtt-orange text-rhtt-orange-800 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>👥 Candidats :</span>
                      <span className="bg-white/80 text-slate-900 px-1.5 py-0.5 rounded-full text-[11px]">
                        {job.candidaturesCount}
                      </span>
                    </button>

                    {/* Aperçu */}
                    <button
                      type="button"
                      onClick={() => setPreviewJob(job)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                      title="Aperçu candidat"
                    >
                      👁️ Aperçu
                    </button>

                    {/* Modifier */}
                    <button
                      type="button"
                      onClick={() => handleEditJob(job)}
                      className="px-3 py-2 bg-rhtt-violet-50 hover:bg-rhtt-violet text-rhtt-violet hover:text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      ✏️ Modifier
                    </button>

                    {/* Dupliquer */}
                    <button
                      type="button"
                      onClick={() => handleDuplicateJob(job)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                      title="Dupliquer l'annonce"
                    >
                      📋
                    </button>

                    {/* Basculer Statut */}
                    {job.status === 'active' ? (
                      <button
                        type="button"
                        onClick={() => handleToggleJobStatus(job.id, 'closed')}
                        className="px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                      >
                        Clôturer
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleJobStatus(job.id, 'active')}
                        className="px-2.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                      >
                        Publier
                      </button>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ONGLET 3 : CANDIDATURES REÇUES SUR LES OFFRES           */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'candidates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Vivier de candidatures reçues</h2>
                <p className="text-xs text-slate-500">Consultez les profils ayant postulé directement à vos offres d'emploi RHTT.</p>
              </div>

              {/* Filtre par offre */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-500">Filtrer par poste :</span>
                <select
                  value={candidateFilterJobId}
                  onChange={(e) => setCandidateFilterJobId(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rhtt-violet"
                >
                  <option value="all">Toutes les offres ({applications.length})</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tableau des candidatures */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Candidat</th>
                      <th className="py-3 px-4">Offre ciblée</th>
                      <th className="py-3 px-4 hidden sm:table-cell">Qualifications</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-center">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{app.candidateName}</div>
                          <div className="text-xs text-slate-500">{app.candidatePhone} • {app.candidateEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-xs font-semibold text-rhtt-violet">{app.jobTitle}</div>
                        </td>
                        <td className="py-3.5 px-4 hidden sm:table-cell">
                          <div className="text-xs text-slate-700 font-medium">{app.qualification}</div>
                          <div className="text-[11px] text-slate-400">{app.experience}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                          {app.dateApplication}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              app.status === 'nouveau'
                                ? 'bg-amber-100 text-amber-800'
                                : app.status === 'en_cours'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'retenu'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {app.status === 'nouveau' ? 'Nouveau' : app.status === 'en_cours' ? 'En revue' : 'Retenu'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => showNotice(`Téléchargement de ${app.cvFile}...`)}
                              className="px-2.5 py-1 text-xs font-bold text-rhtt-violet hover:bg-rhtt-violet-50 rounded-lg transition"
                            >
                              📄 CV
                            </button>
                            <a
                              href={`tel:${app.candidatePhone}`}
                              className="px-2.5 py-1 text-xs font-bold bg-rhtt-orange hover:bg-rhtt-orange-600 text-white rounded-lg transition"
                            >
                              Appeler
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ONGLET 4 : PROFIL RECRUTEUR & FACTURATION               */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Carte Informations société */}
              <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Informations de l'entreprise recruteuse
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">Raison Sociale</span>
                    <span className="font-semibold text-slate-800 text-sm">LogistiX Hub France SAS</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">Numéro SIRET</span>
                    <span className="font-semibold text-slate-800 text-sm">842 901 349 00028</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">Siège d'exploitation</span>
                    <span className="font-semibold text-slate-800">14 Rue du Parc des Chênes, 77340 Pontault-Combault</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">Convention collective</span>
                    <span className="font-semibold text-slate-800">Transports routiers et activités auxiliaires du transport</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                    ✓ Convention RHTT active
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    Règlement par virement 30j
                  </span>
                </div>
              </div>

              {/* Carte Interlocuteur d'agence RHTT */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rhtt-orange block mb-2">
                    Votre Agence Référente
                  </span>
                  <h3 className="text-lg font-black text-white">Agence RHTT Val d'Europe</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Sophie Mercier est votre conseillère attitrée pour valider vos contrats de mise à disposition, sourcer les intérimaires et garantir la conformité légale.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
                  <p>📞 <strong>01 60 29 00 45</strong></p>
                  <p>✉️ <a href="mailto:s.mercier@rhtt.fr" className="text-rhtt-orange hover:underline">s.mercier@rhtt.fr</a></p>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* 4. MODALE APERÇU TEMPS RÉEL (MODE CANDIDAT)               */}
      {/* ========================================================= */}
      {previewJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rhtt-violet-50 text-rhtt-violet-800 border border-rhtt-violet-200">
                  Aperçu fiche candidat
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Réf : {previewJob.reference}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Contenu rendu de l'offre */}
            <div className="space-y-6">
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-rhtt-violet-50 text-rhtt-violet-700 border border-rhtt-violet-200 text-xs font-bold rounded-full">
                    {previewJob.contractType}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                    {previewJob.category}
                  </span>
                  {previewJob.urgency === 'urgent' && (
                    <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-200">
                      ⚡ Urgent
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {previewJob.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                  <span>📍 {previewJob.location}</span>
                  <span>🗓️ Début : <strong className="text-slate-900">{previewJob.startDate}</strong></span>
                  <span>⏳ Durée : {previewJob.duration}</span>
                  <span className="text-rhtt-violet-800 font-mono font-bold bg-rhtt-violet-50 px-2 py-0.5 rounded">
                    💶 {previewJob.salary}
                  </span>
                </div>
              </div>

              {/* Avantages */}
              {previewJob.salaryAdvantages.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Avantages & Primes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewJob.salaryAdvantages.map((a) => (
                      <span key={a} className="px-2 py-0.5 bg-white rounded-md text-xs font-semibold text-slate-700 border border-slate-200">
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Descriptif poste */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 border-l-4 border-rhtt-violet pl-2.5">
                  Descriptif du poste
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {previewJob.descriptifPoste}
                </p>
              </div>

              {/* Profil recherché */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 border-l-4 border-rhtt-orange pl-2.5">
                  Profil recherché & Compétences
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {previewJob.profilRecherche}
                </p>
              </div>

              {/* Bouton simulation candidature */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Simulation du bouton candidat :
                </span>
                <button
                  type="button"
                  disabled
                  className="px-6 py-2.5 rounded-xl bg-rhtt-orange text-white text-xs font-bold opacity-80 cursor-not-allowed"
                >
                  Postuler à cette offre (Mode Candidat)
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
