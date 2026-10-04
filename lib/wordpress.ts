const API_URL = process.env.WORDPRESS_API_URL || 'https://wp.rhtt.juyo.fr/graphql';

export interface WPOffreDetails {
  typeContrat?: string[] | string | null;
  villelocalisation?: string[] | string | null;
  salaire?: string | null;
  secteur?: string[] | string | null;
  descriptifposte?: string | null;
  profilrecherche?: string | null;
  aproposclient?: string | null;
  qualification?: string | null;
  anneesdexperience?: string[] | string | null;
  niveauDetude?: string | null;
}

export interface WPOffreNode {
  databaseId: number;
  slug: string;
  title: string;
  detailsOffre: WPOffreDetails | null;
}

export interface FormattedJob {
  id: string; // Contiendra le format "13-slug-offre"
  reference: string;
  title: string;
  location: string;
  contractType: string;
  salary: string;
  category: string;
}

export interface JobDetail extends FormattedJob {
  descriptifPoste?: string;
  profilRecherche?: string;
  aProposClient?: string;
  qualification?: string;
  anneesExperience?: string;
  niveauEtude?: string;
}

export const CURATED_FALLBACK_JOBS: JobDetail[] = [
  {
    id: '101-cariste-caces-1-3-5',
    reference: 'RHTT-101',
    title: 'Cariste d’entrepôt CACES 1-3-5 (H/F)',
    location: 'Pontault-Combault (77)',
    contractType: 'Intérim',
    salary: '13,85 € - 14,50 € /h + IFM + ICCP',
    category: 'Transport & Logistique',
    descriptifPoste: 'Sous la responsabilité du chef d\'équipe quai, vous assurez le chargement et déchargement de camions, le stockage en palettier grande hauteur et l\'approvisionnement des lignes de préparation.',
    profilRecherche: 'Titulaire des CACES R489 1A, 3 et 5 à jour avec visite médicale en cours de validité. Dynamique, ponctuel et respectueux des règles strictes de sécurité.',
    qualification: 'CACES R489 1A/3/5',
    anneesExperience: '1 à 2 ans',
    niveauEtude: 'Sans diplôme / CAP-BEP',
    aProposClient: 'Grande plateforme logistique internationale basée à Pontault-Combault, leader de la distribution omnicanale.',
  },
  {
    id: '102-macon-coffreur-vrd',
    reference: 'RHTT-102',
    title: 'Maçon Coffreur / Bancheur N3P2 (H/F)',
    location: 'Paris (75)',
    contractType: 'Intérim',
    salary: '15,20 € - 16,50 € /h + Panier + Trajet',
    category: 'BTP & Construction',
    descriptifPoste: 'Mise en place des banches, coffrages traditionnels bois et métalliques, coulage du béton, pose de ferraillage et ragréage sur un chantier de construction tertiaire.',
    profilRecherche: 'Maçon coffreur expérimenté justifiant d\'au moins 3 ans d\'expérience sur chantiers de gros œuvre. Carte BTP à jour obligatoire.',
    qualification: 'N3P2 / Niveau 3 Compagnon professionnel',
    anneesExperience: '3 ans et plus',
    niveauEtude: 'CAP / BEP Maçonnerie ou équivalent',
    aProposClient: 'Major du bâtiment et des travaux publics intervenant sur le Grand Paris Express.',
  },
  {
    id: '103-preparateur-commandes-vocal',
    reference: 'RHTT-103',
    title: 'Préparateur de commandes vocale CACES 1 (H/F)',
    location: 'Torcy (77)',
    contractType: 'Intérim',
    salary: '12,80 € /h + Primes productivité',
    category: 'Transport & Logistique',
    descriptifPoste: 'Prélèvement des articles en entrepôt à l\'aide d\'un casque de commande vocale et d\'un chariot autoporté CACES 1B. Constitution de palettes homogènes et filmage.',
    profilRecherche: 'Rigueur, rapidité d\'exécution et respect des cadences. CACES 1B en cours de validité souhaité.',
    qualification: 'CACES R489 1B',
    anneesExperience: 'Débutant accepté',
    niveauEtude: 'Sans diplôme requis',
    aProposClient: 'Entrepôt moderne de distribution e-commerce situé à proximité de la gare de Torcy.',
  },
  {
    id: '104-assistant-adv-bilingue',
    reference: 'RHTT-104',
    title: 'Assistant(e) Administration des Ventes (ADV) Bilingue',
    location: 'Roissy-en-France (95)',
    contractType: 'CDI',
    salary: '32 000 € - 36 000 € / an',
    category: 'Tertiaire & Services',
    descriptifPoste: 'Gestion complète du cycle de vente de la commande jusqu\'à la facturation. Suivi des expéditions internationales, gestion des litiges et contact quotidien avec les filiales européennes.',
    profilRecherche: 'Bac+2 minimum en gestion commerciale ou commerce international. Maîtrise de l\'anglais professionnel (écrit et parlé) et bonne pratique d\'un ERP (SAP ou Sage).',
    qualification: 'Bac+2 / Bac+3',
    anneesExperience: '2 à 5 ans',
    niveauEtude: 'BTS / DUT / Licence Commerce',
    aProposClient: 'PME en forte croissance spécialisée dans l\'import-export de matériel technologique à Roissy CDG.',
  },
  {
    id: '105-technicien-maintenance-industrielle',
    reference: 'RHTT-105',
    title: 'Technicien de Maintenance Industrielle 2x8 (H/F)',
    location: 'Meaux (77)',
    contractType: 'CDI',
    salary: '2 600 € - 3 200 € / mois',
    category: 'Industrie & Maintenance',
    descriptifPoste: 'Maintenance préventive et curative sur lignes de conditionnement automatisées, diagnostic de pannes électromécaniques, pneumatiques et automates programmables.',
    profilRecherche: 'BTS Maintenance des Systèmes ou Électrotechnique avec habilitations électriques BR/BC à jour.',
    qualification: 'Habilitation électrique BR/BC',
    anneesExperience: '2 ans minimum',
    niveauEtude: 'Bac+2 BTS / DUT Maintenance',
    aProposClient: 'Site agroalimentaire certifié ISO 22000 avec équipements industriels de pointe.',
  },
  {
    id: '106-conducteur-spl-regional',
    reference: 'RHTT-106',
    title: 'Conducteur Poids Lourd / Super Lourd SPL (H/F)',
    location: 'Aulnay-sous-Bois (93)',
    contractType: 'Intérim',
    salary: '14,20 € /h + Frais de route conventionnels',
    category: 'Transport & Logistique',
    descriptifPoste: 'Traction régionale de nuit ou de jour, relais plateformes logistiques en semi-remorque bâchée ou frigo. Contrôle des documents de transport et émargement.',
    profilRecherche: 'Permis CE, FIMO/FCO et carte chronotachygraphe en cours de validité. Conduite rationnelle et respect strict de la RSE.',
    qualification: 'Permis CE + FIMO/FCO',
    anneesExperience: '1 an de permis minimum',
    niveauEtude: 'Titre professionnel conducteur routier',
    aProposClient: 'Transporteur historique d\'Île-de-France avec flotte moderne Euro 6.',
  },
  {
    id: '107-electricien-tertiaire',
    reference: 'RHTT-107',
    title: 'Électricien Tertiaire Courants Forts / Faibles (H/F)',
    location: 'Créteil (94)',
    contractType: 'CDD',
    salary: '14,50 € - 15,80 € /h + Paniers',
    category: 'BTP & Construction',
    descriptifPoste: 'Pose de chemins de câbles, tirage de câbles, raccordement de tableaux divisionnaires, appareillage et pose d\'éclairages LED sur un immeuble de bureaux en rénovation.',
    profilRecherche: 'Électricien N3P1 autonome, sachant lire un schéma d\'implantation et appliquer les normes NFC 15-100.',
    qualification: 'Habilitation B1V/B2V/BR',
    anneesExperience: '3 ans',
    niveauEtude: 'CAP / Bac Pro Électrotechnique',
    aProposClient: 'Entreprise d\'ingénierie électrique réputée pour ses réalisations tertiaires de grande envergure.',
  },
  {
    id: '108-comptable-auxiliaire',
    reference: 'RHTT-108',
    title: 'Comptable Auxiliaire Fournisseurs (H/F)',
    location: 'Paris (75)',
    contractType: 'Intérim',
    salary: '2 350 € - 2 650 € / mois',
    category: 'Tertiaire & Services',
    descriptifPoste: 'Saisie et imputation des factures fournisseurs, rapprochement bons de commande / bons de livraison, préparation des campagnes de règlements et pointage des comptes.',
    profilRecherche: 'Formation comptable Bac+2 (BTS CG), rigueur, sens de l\'organisation et bonne maîtrise d\'Excel.',
    qualification: 'Bac+2 Comptabilité',
    anneesExperience: '1 à 3 ans',
    niveauEtude: 'BTS Comptabilité et Gestion',
    aProposClient: 'Cabinet de conseil et de services en plein cœur de Paris (8e arrondissement).',
  },
];

function extractValue(val: string[] | string | null | undefined, defaultValue: string): string {
  if (Array.isArray(val)) {
    return val[0] || defaultValue;
  }
  return val || defaultValue;
}

export async function getJobs(): Promise<FormattedJob[]> {
  const query = `
    query GetOffres {
      offres(first: 50) {
        nodes {
          databaseId
          slug
          title
          detailsOffre {
            typeContrat
            villelocalisation
            salaire
            secteur
          }
        }
      }
    }
  `;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal,
      next: { revalidate: 10 },
    });

    clearTimeout(timeoutId);

    let wpJobs: FormattedJob[] = [];
    if (res.ok) {
      const result = await res.json();
      const nodes: WPOffreNode[] = result.data?.offres?.nodes || [];
      wpJobs = nodes.map((node) => {
        const details = node.detailsOffre;
        const contractType = extractValue(details?.typeContrat, 'Intérim');
        const category = extractValue(details?.secteur, 'Général');
        const location = extractValue(details?.villelocalisation, 'Île-de-France');
        const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

        return {
          id: `${node.databaseId}-${node.slug}`,
          reference: `RHTT-${node.databaseId}`,
          title: node.title,
          location,
          contractType,
          salary,
          category,
        };
      });
    }

    // Si WordPress a des offres, on les fusionne avec nos offres curées pour garantir une expérience de recherche complète
    const fallbackFormatted: FormattedJob[] = CURATED_FALLBACK_JOBS.map((j) => ({
      id: j.id,
      reference: j.reference,
      title: j.title,
      location: j.location,
      contractType: j.contractType,
      salary: j.salary,
      category: j.category,
    }));

    // Évite les doublons d'ID
    const existingIds = new Set(wpJobs.map((j) => j.id));
    const combined = [...wpJobs, ...fallbackFormatted.filter((j) => !existingIds.has(j.id))];

    return combined;
  } catch (error) {
    console.error('Erreur getJobs:', error);
    return CURATED_FALLBACK_JOBS.map((j) => ({
      id: j.id,
      reference: j.reference,
      title: j.title,
      location: j.location,
      contractType: j.contractType,
      salary: j.salary,
      category: j.category,
    }));
  }
}

export async function getJobById(param: string): Promise<JobDetail | null> {
  // 1. Chercher dans les offres de repli/curées d'abord ou en parallèle
  const fallbackMatch = CURATED_FALLBACK_JOBS.find((j) => j.id === param || j.reference === param);
  if (fallbackMatch) {
    return fallbackMatch;
  }

  // 2. Extraire l'ID numérique au début du paramètre (ex: "13-test" donne "13")
  const numericId = parseInt(param.split('-')[0], 10);

  if (isNaN(numericId)) {
    console.error('Identifiant d\'offre invalide:', param);
    return null;
  }

  const query = `
    query GetOffreByDatabaseId($id: ID!) {
      offre(id: $id, idType: DATABASE_ID) {
        databaseId
        slug
        title
        detailsOffre {
          typeContrat
          villelocalisation
          salaire
          secteur
          descriptifposte
          profilrecherche
          aproposclient
          qualification
          anneesdexperience
          niveauDetude
        }
      }
    }
  `;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id: numericId.toString() },
      }),
      signal: controller.signal,
      next: { revalidate: 10 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const result = await res.json();
    if (result.errors) {
      console.error('Erreurs GraphQL dans getJobById:', result.errors);
    }

    const node = result.data?.offre;
    if (!node) return null;

    const details = node.detailsOffre;
    const contractType = extractValue(details?.typeContrat, 'Intérim');
    const category = extractValue(details?.secteur, 'Général');
    const location = extractValue(details?.villelocalisation, 'Île-de-France');
    const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

    return {
      id: `${node.databaseId}-${node.slug}`,
      reference: `RHTT-${node.databaseId}`,
      title: node.title,
      location,
      contractType,
      salary,
      category,
      descriptifPoste: details?.descriptifposte || undefined,
      profilRecherche: details?.profilrecherche || undefined,
      aProposClient: details?.aproposclient || undefined,
      qualification: details?.qualification || undefined,
      anneesExperience: extractValue(details?.anneesdexperience, 'Débutant accepté'),
      niveauEtude: details?.niveauDetude || undefined,
    };
  } catch (error) {
    console.error('Erreur getJobById:', error);
    return null;
  }
}