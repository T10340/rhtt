'use client';

import { useState } from 'react';
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
  // Navigation principale du portail
  const [activeTab, setActiveTab] = useState<'my-jobs' | 'candidates' | 'profile'>('my-jobs');

  // Gestion des offres et candidatures
  const [jobs, setJobs] = useState<EnterpriseJobOffer[]>(INITIAL_ENTERPRISE_JOBS);
  const [applications, setApplications] = useState<CandidateApplication[]>(INITIAL_APPLICATIONS);

  // État du Pop-up Statique Multi-Étapes
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepError, setStepError] = useState<string | null>(null);

  // État de l'offre en cours d'édition
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Champs de l'offre
  // ÉTAPE 1 : Poste & Type de mission
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Transport & Logistique');
  const [contractType, setContractType] = useState('Intérim');
  const [positionsCount, setPositionsCount] = useState<number>(1);
  const [urgency, setUrgency] = useState<'urgent' | 'normal' | 'anticipation'>('normal');

  // ÉTAPE 2 : Dates, Durée de mission & Horaires
  const [isImmediateStart, setIsImmediateStart] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('3 mois renouvelable');
  const [location, setLocation] = useState('Pontault-Combault (77)');
  const [schedule, setSchedule] = useState('Temps plein 35h');

  // ÉTAPE 3 : Rémunération & Avantages
  const [salaryAmount, setSalaryAmount] = useState('13,85 € /h');
  const [salaryType, setSalaryType] = useState<'horaire' | 'mensuel' | 'annuel'>('horaire');
  const [salaryAdvantages, setSalaryAdvantages] = useState<string[]>([
    '+ 10% IFM',
    '+ 10% Congés Payés (ICCP)',
    'Panier repas conventionnel',
  ]);
  const [advantageInput, setAdvantageInput] = useState('');

  // ÉTAPE 4 : Missions & Profil recherché
  const [descriptifPoste, setDescriptifPoste] = useState('');
  const [profilRecherche, setProfilRecherche] = useState('');
  const [qualification, setQualification] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('1 à 2 ans');

  // Filtres et feedback
  const [jobStatusFilter, setJobStatusFilter] = useState<'all' | 'active' | 'draft' | 'closed'>('all');
  const [candidateJobFilter, setCandidateJobFilter] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);
  const [previewJob, setPreviewJob] = useState<EnterpriseJobOffer | null>(null);

  // Charger un modèle pré-défini
  const handleLoadTemplate = (tpl: typeof JOB_TEMPLATES[0]) => {
    setTitle(tpl.title);
    setCategory(tpl.category);
    setContractType(tpl.contractType);
    setDuration(tpl.duration);
    setSalaryAmount(tpl.salary);
    setSchedule(tpl.schedule);
    setQualification(tpl.qualification);
    setDescriptifPoste(tpl.descriptifPoste);
    setProfilRecherche(tpl.profilRecherche);
    setStepError(null);
    showNotice(`Modèle "${tpl.label}" chargé avec succès !`);
  };

  // Réinitialiser les champs du formulaire
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
    setCurrentStep(1);
    setStepError(null);
  };

  // Ouvrir le pop-up pour une nouvelle offre
  const handleOpenNewOfferModal = () => {
    resetForm();
    setIsEditorModalOpen(true);
  };

  // Ouvrir le pop-up pour modifier une offre existante
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
    setCurrentStep(1);
    setStepError(null);
    setIsEditorModalOpen(true);
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

  // Navigation dans le pop-up par étapes
  const handleNextStep = () => {
    setStepError(null);

    // Validation de l'étape 1
    if (currentStep === 1) {
      if (!title.trim()) {
        setStepError("Veuillez renseigner l'intitulé du poste pour continuer.");
        return;
      }
      setCurrentStep(2);
      return;
    }

    // Validation de l'étape 2
    if (currentStep === 2) {
      if (!location.trim()) {
        setStepError("Veuillez renseigner la ville ou le lieu de la mission.");
        return;
      }
      setCurrentStep(3);
      return;
    }

    // Validation de l'étape 3
    if (currentStep === 3) {
      if (!salaryAmount.trim()) {
        setStepError("Veuillez indiquer un montant ou une estimation de rémunération.");
        return;
      }
      setCurrentStep(4);
      return;
    }
  };

  const handlePrevStep = () => {
    setStepError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Soumission finale de l'offre (Publication ou Brouillon)
  const handleSubmitJob = (targetStatus: 'active' | 'draft') => {
    if (!title.trim()) {
      setStepError("L'intitulé de poste est obligatoire.");
      setCurrentStep(1);
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
          ? `Votre offre "${newJob.title}" est publiée en direct sur le site !`
          : `L'offre "${newJob.title}" a été sauvegardée dans vos brouillons.`
      );
    }

    setIsEditorModalOpen(false);
    resetForm();
    setActiveTab('my-jobs');
  };

  // Objet pour l'aperçu candidat
  const currentFormPreviewJob: EnterpriseJobOffer = {
    id: editingJobId || 'PREVIEW',
    reference: editingJobId ? `RHTT-REF-${editingJobId}` : 'RHTT-NOUVELLE-OFFRE',
    title: title.trim() || 'Intitulé de poste non renseigné',
    category,
    contractType,
    location: location || 'Pontault-Combault (77)',
    startDate: isImmediateStart ? 'Dès que possible' : (startDate || 'Dès que possible'),
    duration: duration || 'Durée non spécifiée',
    salary: salaryAmount || 'Rémunération selon profil',
    salaryType,
    salaryAdvantages,
    schedule: schedule || 'Temps plein',
    positionsCount,
    urgency,
    descriptifPoste: descriptifPoste || 'Aucune description saisie pour le moment.',
    profilRecherche: profilRecherche || 'Aucun profil recherché saisi.',
    qualification,
    experienceLevel,
    status: 'active',
    createdAt: new Date().toLocaleDateString('fr-FR'),
    candidaturesCount: 0,
  };

  // Filtrage des offres dans la liste
  const filteredJobs = jobs.filter((j) => {
    if (jobStatusFilter === 'all') return true;
    return j.status === jobStatusFilter;
  });

  // Filtrage des candidatures
  const filteredApplications = applications.filter((app) => {
    if (candidateJobFilter === 'all') return true;
    return app.jobId === candidateJobFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header />

      {/* ========================================================= */}
      {/* 1. EN-TÊTE DASHBOARD ENTREPRISE                           */}
      {/* ========================================================= */}
      <section className="bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
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

            {/* CTAs d'action rapide */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenNewOfferModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-rhtt-orange hover:bg-rhtt-orange-600 text-white rounded-xl text-sm font-black transition shadow-lg shadow-rhtt-orange/25 active:scale-95 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Poster une offre d'emploi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('my-jobs')}
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-sm font-semibold transition active:scale-95 cursor-pointer"
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
              className="text-white/80 hover:text-white text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. BARRE D'ONGLETS DU PORTAIL                             */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-slate-200 sticky top-18 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar py-2">
            
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

            <button
              type="button"
              onClick={handleOpenNewOfferModal}
              className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black bg-rhtt-orange/10 hover:bg-rhtt-orange/20 text-rhtt-orange border border-rhtt-orange/30 flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <span>+</span>
              <span>Créer une annonce (Pop-up)</span>
            </button>

          </nav>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CONTENU PRINCIPAL                                      */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* BANNIÈRE D'APPEL À L'ACTION : CRÉATION D'OFFRE EN POP-UP PAR ÉTAPES */}
        <div className="mb-8 bg-gradient-to-r from-rhtt-violet-900 via-rhtt-violet-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-rhtt-violet-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rhtt-orange text-white">
              Recrutement express
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Publiez votre besoin en intérim, CDD ou CDI
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Formulaire guidé étape par étape : définissez le poste, fixez la date et la durée de mission, ajustez la rémunération et validez. L'offre est traitée sous 24h par votre agence RHTT.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleOpenNewOfferModal}
              className="px-6 py-3.5 rounded-xl bg-rhtt-orange hover:bg-rhtt-orange-600 text-white font-black text-sm transition shadow-lg shadow-rhtt-orange/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Lancer le formulaire (4 étapes)</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* ONGLET : MES ANNONCES PUBLIÉES                         */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'my-jobs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Mes annonces d'emploi
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilotez les missions en cours de recrutement et suivez les candidatures entrantes.
                </p>
              </div>

              {/* Filtre de statut */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statut :</span>
                <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setJobStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      jobStatusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Toutes ({jobs.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobStatusFilter('active')}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      jobStatusFilter === 'active' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    En ligne ({jobs.filter((j) => j.status === 'active').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobStatusFilter('draft')}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      jobStatusFilter === 'draft' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Brouillons ({jobs.filter((j) => j.status === 'draft').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobStatusFilter('closed')}
                    className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                      jobStatusFilter === 'closed' ? 'bg-white text-slate-700 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Clôturées ({jobs.filter((j) => j.status === 'closed').length})
                  </button>
                </div>
              </div>
            </div>

            {/* Grille des annonces */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl font-bold">
                    📋
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Aucune annonce trouvée</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Aucune offre ne correspond au statut sélectionné. Vous pouvez en publier une nouvelle dès maintenant.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenNewOfferModal}
                    className="px-5 py-2.5 bg-rhtt-orange text-white text-xs font-bold rounded-xl shadow-xs hover:bg-rhtt-orange-600 transition cursor-pointer"
                  >
                    + Créer une nouvelle offre d'emploi
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      {/* En-tête de l'annonce */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              job.status === 'active'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : job.status === 'draft'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-300'
                            }`}
                          >
                            {job.status === 'active' && '● En ligne'}
                            {job.status === 'draft' && '○ Brouillon'}
                            {job.status === 'closed' && '✕ Pourvue / Clôturée'}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rhtt-violet-50 text-rhtt-violet-700 border border-rhtt-violet-200">
                            {job.contractType}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {job.category}
                          </span>

                          {job.urgency === 'urgent' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              ⚡ Urgent
                            </span>
                          )}

                          <span className="text-xs text-slate-400 font-mono">
                            Réf : {job.reference}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-slate-900">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>📍 {job.location}</span>
                          <span>•</span>
                          <span>🗓️ Début : <strong className="text-slate-800">{job.startDate}</strong></span>
                          <span>•</span>
                          <span>⏳ Durée : {job.duration}</span>
                          <span>•</span>
                          <span>💶 Rémunération : <strong className="text-rhtt-violet-800">{job.salary}</strong></span>
                          <span>•</span>
                          <span>👥 {job.positionsCount} poste(s)</span>
                        </div>
                      </div>

                      {/* Compteur de candidatures & Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setCandidateJobFilter(job.id);
                            setActiveTab('candidates');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-rhtt-orange-50 hover:bg-rhtt-orange-100 text-rhtt-orange-900 border border-rhtt-orange-200 text-xs font-black transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>👥</span>
                          <span>{job.candidaturesCount} candidature(s)</span>
                        </button>
                        <span className="text-[11px] text-slate-400">
                          Publiée le {job.createdAt}
                        </span>
                      </div>

                    </div>

                    {/* Avantages de l'offre */}
                    {job.salaryAdvantages.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-bold mr-1">Avantages :</span>
                        {job.salaryAdvantages.map((adv) => (
                          <span
                            key={adv}
                            className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700"
                          >
                            ✓ {adv}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Barre d'actions rapides sur l'annonce */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditJob(job)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>✏️</span>
                          <span>Modifier dans le pop-up</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicateJob(job)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                        >
                          📄 Dupliquer
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreviewJob(job)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                        >
                          👁️ Aperçu candidat
                        </button>
                      </div>

                      {/* Changer l'état */}
                      <div className="flex items-center gap-2">
                        {job.status === 'active' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job.id, 'closed')}
                            className="text-slate-500 hover:text-rose-600 font-semibold transition cursor-pointer"
                          >
                            Clôturer la mission
                          </button>
                        ) : job.status === 'draft' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job.id, 'active')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition cursor-pointer"
                          >
                            Mettre en ligne
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleJobStatus(job.id, 'active')}
                            className="text-rhtt-violet hover:underline font-bold transition cursor-pointer"
                          >
                            Réactiver l'annonce
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ONGLET : CANDIDATURES REÇUES                            */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'candidates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Candidatures reçues ({filteredApplications.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Profils sourcés et qualifiés par l'agence RHTT pour vos missions en cours.
                </p>
              </div>

              {/* Filtre par offre */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offre :</span>
                <select
                  value={candidateJobFilter}
                  onChange={(e) => setCandidateJobFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-rhtt-violet/20"
                >
                  <option value="all">Toutes les offres ({applications.length} candidats)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.candidaturesCount})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Liste des candidatures */}
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-xl font-bold">
                    👥
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Aucune candidature pour cette sélection</h3>
                  <p className="text-xs text-slate-500">
                    Les nouvelles candidatures apparaîtront ici dès que les intérimaires postuleront à votre offre.
                  </p>
                </div>
              ) : (
                filteredApplications.map((cand) => (
                  <div
                    key={cand.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              cand.status === 'nouveau'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : cand.status === 'retenu'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : cand.status === 'en_cours'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : 'bg-slate-100 text-slate-600 border-slate-300'
                            }`}
                          >
                            {cand.status === 'nouveau' && '★ Nouveau profil'}
                            {cand.status === 'retenu' && '✓ Candidat retenu'}
                            {cand.status === 'en_cours' && '⏳ Entretien en cours'}
                            {cand.status === 'refuse' && '✕ Non retenu'}
                          </span>

                          <span className="text-xs font-bold text-rhtt-violet">
                            Offre : {cand.jobTitle}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900">
                          {cand.candidateName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>📧 {cand.candidateEmail}</span>
                          <span>•</span>
                          <span>📞 {cand.candidatePhone}</span>
                          <span>•</span>
                          <span>Postulé le {cand.dateApplication}</span>
                        </div>
                      </div>

                      {/* Bouton de téléchargement du CV */}
                      <button
                        type="button"
                        onClick={() => showNotice(`Téléchargement sécurisé du CV : ${cand.cvFile}`)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Télécharger CV</span>
                      </button>

                    </div>

                    {/* Qualifications & Expérience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">Qualifications certifiées</span>
                        <p className="font-semibold text-slate-800">{cand.qualification}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">Expériences significatives</span>
                        <p className="font-semibold text-slate-800">{cand.experience}</p>
                      </div>
                    </div>

                    {/* Actions de gestion du candidat */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setApplications(
                              applications.map((a) => (a.id === cand.id ? { ...a, status: 'retenu' } : a))
                            );
                            showNotice(`Le candidat ${cand.candidateName} a été validé ! L'agence RHTT prépare le contrat.`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer"
                        >
                          ✓ Valider pour la mission
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setApplications(
                              applications.map((a) => (a.id === cand.id ? { ...a, status: 'en_cours' } : a))
                            );
                            showNotice(`Statut mis à jour : Entretien en cours avec ${cand.candidateName}.`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                        >
                          Planifier entretien
                        </button>
                      </div>

                      <a
                        href={`tel:${cand.candidatePhone}`}
                        className="text-rhtt-violet hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Appeler directement</span>
                        <span>→</span>
                      </a>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ONGLET : PROFIL ENTREPRISE & FACTURATION               */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Fiche entreprise & Paramètres de délégation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Informations administratives et contact privilégié RHTT pour la facturation et les contrats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                  Renseignements légaux
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">Raison sociale</span>
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
      {/* 4. POP-UP STATIQUE MULTI-ÉTAPES (ÉDITEUR D'OFFRE)         */}
      {/* ========================================================= */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* EN-TÊTE DU POP-UP */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rhtt-orange text-white">
                    {editingJobId ? 'Modification' : 'Nouvelle offre'}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {editingJobId ? "Modifier l'offre d'emploi" : "Poster une offre d'emploi"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition cursor-pointer"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>

              {/* STEPPER VISUEL STATIQUE */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                
                {/* Étape 1 */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`text-left p-2 rounded-xl transition cursor-pointer ${
                    currentStep === 1
                      ? 'bg-rhtt-violet text-white shadow-xs'
                      : currentStep > 1
                      ? 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                      {currentStep > 1 ? '✓' : '1'}
                    </span>
                    <span className="truncate">Poste</span>
                  </div>
                  <span className="hidden sm:block text-[10px] opacity-80 mt-0.5 truncate">
                    Type de mission
                  </span>
                </button>

                {/* Étape 2 */}
                <button
                  type="button"
                  onClick={() => {
                    if (title.trim()) setCurrentStep(2);
                  }}
                  className={`text-left p-2 rounded-xl transition cursor-pointer ${
                    currentStep === 2
                      ? 'bg-rhtt-violet text-white shadow-xs'
                      : currentStep > 2
                      ? 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                      {currentStep > 2 ? '✓' : '2'}
                    </span>
                    <span className="truncate">Dates & Lieu</span>
                  </div>
                  <span className="hidden sm:block text-[10px] opacity-80 mt-0.5 truncate">
                    Durée & Horaires
                  </span>
                </button>

                {/* Étape 3 */}
                <button
                  type="button"
                  onClick={() => {
                    if (title.trim() && location.trim()) setCurrentStep(3);
                  }}
                  className={`text-left p-2 rounded-xl transition cursor-pointer ${
                    currentStep === 3
                      ? 'bg-rhtt-violet text-white shadow-xs'
                      : currentStep > 3
                      ? 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                      {currentStep > 3 ? '✓' : '3'}
                    </span>
                    <span className="truncate">Salaire</span>
                  </div>
                  <span className="hidden sm:block text-[10px] opacity-80 mt-0.5 truncate">
                    Primes & Avantages
                  </span>
                </button>

                {/* Étape 4 */}
                <button
                  type="button"
                  onClick={() => {
                    if (title.trim() && location.trim() && salaryAmount.trim()) setCurrentStep(4);
                  }}
                  className={`text-left p-2 rounded-xl transition cursor-pointer ${
                    currentStep === 4
                      ? 'bg-rhtt-violet text-white shadow-xs'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <span className="truncate">Missions</span>
                  </div>
                  <span className="hidden sm:block text-[10px] opacity-80 mt-0.5 truncate">
                    Profil & Publication
                  </span>
                </button>

              </div>
            </div>

            {/* ALERTE ERREUR ÉTAPE */}
            {stepError && (
              <div className="px-6 py-2.5 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-between">
                <span>⚠️ {stepError}</span>
                <button onClick={() => setStepError(null)} className="text-rose-500 hover:text-rose-800">✕</button>
              </div>
            )}

            {/* CORPS DU FORMULAIRE : ÉTAPE PAR ÉTAPE (CONTENEUR STATIQUE) */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-[380px] space-y-6">
              
              {/* =================================================== */}
              {/* ÉTAPE 1 : POSTE ET TYPE DE MISSION                  */}
              {/* =================================================== */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rhtt-violet block mb-1">
                      Étape 1 sur 4
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Poste et type de mission
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Renseignez l'intitulé de poste, le secteur d'activité et le type de contrat recherché.
                    </p>
                  </div>

                  {/* Modèles d'offres en 1 clic */}
                  <div>
                    <span className="text-xs font-bold text-slate-600 block mb-2">
                      Remplissage rapide (Gabarits prêts à l'emploi) :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.label}
                          type="button"
                          onClick={() => handleLoadTemplate(tpl)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rhtt-violet-50 hover:text-rhtt-violet hover:border-rhtt-violet-200 border border-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
                        >
                          ⚡ {tpl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Titre du poste */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Intitulé du poste <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (stepError) setStepError(null);
                      }}
                      placeholder="Ex: Cariste d'entrepôt CACES 3 et 5 (H/F)"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rhtt-violet focus:border-rhtt-violet outline-hidden transition"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Exemple : Préparateur de commandes, Maçon Coffreur, Électromécanicien...</span>
                      <span>{title.length} caractères</span>
                    </div>
                  </div>

                  {/* Ligne : Secteur & Type de contrat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Secteur d'activité / Métier
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                      >
                        <option value="Transport & Logistique">Transport & Logistique</option>
                        <option value="BTP & Construction">BTP & Construction</option>
                        <option value="Industrie & Maintenance">Industrie & Maintenance</option>
                        <option value="Tertiaire & Services">Tertiaire & Services</option>
                        <option value="Agroalimentaire & Restauration">Agroalimentaire & Restauration</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Type de contrat
                      </label>
                      <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                      >
                        <option value="Intérim">Intérim (Délégation temporaire)</option>
                        <option value="CDD">CDD (Contrat à durée déterminée)</option>
                        <option value="CDI">CDI (Placement direct)</option>
                        <option value="CDI Intérimaire">CDI Intérimaire (CDI-I)</option>
                      </select>
                    </div>
                  </div>

                  {/* Ligne : Nombre de postes & Degré d'urgence */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Nombre de postes à pourvoir
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={positionsCount}
                        onChange={(e) => setPositionsCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Degré d'urgence
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setUrgency('normal')}
                          className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                            urgency === 'normal'
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          Normal
                        </button>
                        <button
                          type="button"
                          onClick={() => setUrgency('urgent')}
                          className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                            urgency === 'urgent'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          ⚡ Urgent
                        </button>
                        <button
                          type="button"
                          onClick={() => setUrgency('anticipation')}
                          className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                            urgency === 'anticipation'
                              ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          Anticipé
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* =================================================== */}
              {/* ÉTAPE 2 : DATES, DURÉE DE MISSION & HORAIRES        */}
              {/* =================================================== */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rhtt-violet block mb-1">
                      Étape 2 sur 4
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Dates, Durée de mission & Horaires
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Précisez la date de démarrage, la durée prévisible de mission et l'organisation du temps de travail.
                    </p>
                  </div>

                  {/* Date de démarrage */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800">
                        Date de début de la mission
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rhtt-orange">
                        <input
                          type="checkbox"
                          checked={isImmediateStart}
                          onChange={(e) => setIsImmediateStart(e.target.checked)}
                          className="w-4 h-4 rounded text-rhtt-orange focus:ring-rhtt-orange border-slate-300"
                        />
                        <span>Prise de poste immédiate (Dès que possible)</span>
                      </label>
                    </div>

                    {!isImmediateStart && (
                      <div className="pt-2 animate-in fade-in">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* Durée de la mission */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Durée de la mission
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Ex: 3 mois renouvelable, Mission longue 6 mois, Pic d'activité 4 semaines..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                    />
                    <p className="text-[11px] text-slate-400">
                      Indiquez la visibilité temporelle de la mission (ex: 2 semaines, 3 mois renouvelable, embauche CDI possible).
                    </p>
                  </div>

                  {/* Lieu de la mission */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Lieu / Ville d'exécution de la mission <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (stepError) setStepError(null);
                      }}
                      placeholder="Ex: Pontault-Combault (77), Torcy (77), Roissy (95)..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                    />
                  </div>

                  {/* Organisation du temps de travail */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Horaires et organisation du travail
                    </label>
                    <input
                      type="text"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      placeholder="Ex: 2x8 (06h-13h30 / 13h30-21h), Temps plein 35h, Travail de nuit, Week-end..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                    />
                  </div>

                </div>
              )}

              {/* =================================================== */}
              {/* ÉTAPE 3 : RÉMUNÉRATION & AVANTAGES                  */}
              {/* =================================================== */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rhtt-violet block mb-1">
                      Étape 3 sur 4
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Rémunération & Avantages
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Définissez la grille de rémunération et les primes conventionnelles applicables à la mission.
                    </p>
                  </div>

                  {/* Rémunération et base */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Montant de la rémunération brute <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={salaryAmount}
                        onChange={(e) => {
                          setSalaryAmount(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder="Ex: 13,85 € /h, 2 200 € / mois, Selon profil..."
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Base de calcul
                      </label>
                      <select
                        value={salaryType}
                        onChange={(e) => setSalaryType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                      >
                        <option value="horaire">Taux horaire brut (€/h)</option>
                        <option value="mensuel">Salaire mensuel brut (€/mois)</option>
                        <option value="annuel">Salaire annuel brut (€/an)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primes et avantages cochables */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Avantages et primes intérimaires (Cochez pour inclure dans l'annonce) :
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        '+ 10% IFM (Indemnités de fin de mission)',
                        '+ 10% Congés Payés (ICCP)',
                        'Panier repas conventionnel',
                        'Indemnités kilométriques / transport',
                        'Primes d’équipe / panier de nuit',
                        'Primes de productivité',
                        '13ème mois proratisé',
                        'Heures supplémentaires majorées',
                      ].map((adv) => {
                        const isChecked = salaryAdvantages.includes(adv);
                        return (
                          <button
                            key={adv}
                            type="button"
                            onClick={() => toggleAdvantage(adv)}
                            className={`p-2.5 rounded-xl text-xs font-bold text-left border flex items-center gap-2 transition cursor-pointer ${
                              isChecked
                                ? 'bg-rhtt-violet-50 text-rhtt-violet-900 border-rhtt-violet-300 shadow-2xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                isChecked ? 'bg-rhtt-violet text-white' : 'border border-slate-300'
                              }`}
                            >
                              {isChecked && '✓'}
                            </span>
                            <span>{adv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ajout d'avantage personnalisé */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 block">
                      Ajouter un avantage spécifique
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={advantageInput}
                        onChange={(e) => setAdvantageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCustomAdvantage();
                          }
                        }}
                        placeholder="Ex: Mutuelle d'entreprise prise en charge à 70%, Titres restaurant..."
                        className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={addCustomAdvantage}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* =================================================== */}
              {/* ÉTAPE 4 : MISSIONS & PROFIL RECHERCHÉ               */}
              {/* =================================================== */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rhtt-violet block mb-1">
                      Étape 4 sur 4
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Missions & Profil recherché
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Détaillez les tâches quotidiennes confiées au candidat et les compétences requises.
                    </p>
                  </div>

                  {/* Descriptif des missions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Description des missions & Tâches confiées
                    </label>
                    <textarea
                      rows={4}
                      value={descriptifPoste}
                      onChange={(e) => setDescriptifPoste(e.target.value)}
                      placeholder="Détaillez les activités : déchargement, préparation, conduite d'engins, gestion d'équipe..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden leading-relaxed"
                    />
                  </div>

                  {/* Profil recherché */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Profil recherché, qualifications & Habilitations requises
                    </label>
                    <textarea
                      rows={3}
                      value={profilRecherche}
                      onChange={(e) => setProfilRecherche(e.target.value)}
                      placeholder="Ex: CACES 1-3-5 valides, Carte BTP, rigueur, ponctualité, permis B..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rhtt-violet outline-hidden leading-relaxed"
                    />
                  </div>

                  {/* Ligne Expérience */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Expérience minimale requise
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-rhtt-violet outline-hidden"
                    >
                      <option value="Débutant accepté">Débutant motivé accepté</option>
                      <option value="1 à 2 ans">1 à 2 ans d'expérience</option>
                      <option value="3 à 5 ans">3 à 5 ans d'expérience</option>
                      <option value="5 ans et plus">Profil senior (5 ans et plus)</option>
                    </select>
                  </div>

                  {/* Récapitulatif express de l'offre */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Synthèse de votre offre
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewJob(currentFormPreviewJob)}
                        className="text-rhtt-violet font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>👁️ Voir l'aperçu candidat</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 block">Poste :</span>
                        <strong className="text-slate-800 truncate block">{title || 'Non spécifié'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Contrat :</span>
                        <strong className="text-slate-800">{contractType}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Lieu :</span>
                        <strong className="text-slate-800 truncate block">{location}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Salaire :</span>
                        <strong className="text-rhtt-violet-800">{salaryAmount}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* PIED DU POP-UP (BOUTONS DE NAVIGATION & ACTIONS FINALES) */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              {/* Bouton Précédent */}
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>←</span>
                    <span>Étape précédente</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditorModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition cursor-pointer"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {/* Bouton Suivant / Actions Finales */}
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Bouton aperçu candidat accessible à toutes les étapes */}
                <button
                  type="button"
                  onClick={() => setPreviewJob(currentFormPreviewJob)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Voir la fiche telle qu'elle apparaîtra aux candidats"
                >
                  <span>👁️</span>
                  <span className="hidden sm:inline">Aperçu candidat</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-rhtt-violet hover:bg-rhtt-violet-800 text-white text-xs font-black shadow-md shadow-rhtt-violet/20 transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Étape suivante</span>
                    <span>→</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSubmitJob('draft')}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 transition cursor-pointer"
                    >
                      Enregistrer brouillon
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSubmitJob('active')}
                      className="px-6 py-2.5 rounded-xl bg-rhtt-orange hover:bg-rhtt-orange-600 text-white text-xs font-black shadow-lg shadow-rhtt-orange/30 transition flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Publier l'offre sur le site</span>
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODALE APERÇU TEMPS RÉEL (MODE CANDIDAT)               */}
      {/* ========================================================= */}
      {previewJob && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
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
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
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
