const API_URL = process.env.WORDPRESS_API_URL || 'https://wp.rhtt.juyo.fr/graphql';

export interface WPOffreDetails {
  typeContrat?: string[] | string | null;
  villelocalisation?: string[] | string | null;
  villeLocalisation?: string[] | string | null; // Sécurité rétrocompatible
  salaire?: string | null;
  secteur?: string[] | string | null;
  descriptifPoste?: string | null;
  profilRecherche?: string | null;
  aProposClient?: string | null;
  qualification?: string | null;
  anneesExperience?: string | null;
  niveauEtude?: string | null;
}

export interface WPOffreNode {
  id: string;
  title: string;
  detailsOffre: WPOffreDetails | null;
}

export interface FormattedJob {
  id: string;
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

// Fonction utilitaire pour extraire proprement une valeur qu'elle soit string ou tableau
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
          id
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
    // Timeout de 5s pour ne jamais bloquer le serveur Node sur Plesk
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal,
      next: { revalidate: 10 }, // Revalidation plus rapide pour tester
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`Erreur HTTP WordPress: ${res.status}`);
      return [];
    }

    const { data } = await res.json();
    const nodes: WPOffreNode[] = data?.offres?.nodes || [];

    return nodes.map((node) => {
      const details = node.detailsOffre;

      const contractType = extractValue(details?.typeContrat, 'Intérim');
      const category = extractValue(details?.secteur, 'Général');
      const location = extractValue(
        details?.villelocalisation || details?.villeLocalisation,
        'Île-de-France'
      );
      const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

      return {
        id: node.id,
        title: node.title,
        location,
        contractType,
        salary,
        category,
      };
    });
  } catch (error) {
    console.error('Erreur getJobs (timeout ou réseau):', error);
    return [];
  }
}

export async function getJobById(id: string): Promise<JobDetail | null> {
  const query = `
    query GetOffreById($id: ID!) {
      offre(id: $id) {
        id
        title
        detailsOffre {
          typeContrat
          villelocalisation
          salaire
          secteur
          descriptifPoste
          profilRecherche
          aProposClient
          qualification
          anneesExperience
          niveauEtude
        }
      }
    }
  `;

  try {
    // Timeout de 5s également pour la page de détail
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
      signal: controller.signal,
      next: { revalidate: 10 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const { data } = await res.json();
    const node = data?.offre;

    if (!node) return null;

    const details = node.detailsOffre;
    const contractType = extractValue(details?.typeContrat, 'Intérim');
    const category = extractValue(details?.secteur, 'Général');
    const location = extractValue(
      details?.villelocalisation || details?.villeLocalisation,
      'Île-de-France'
    );
    const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

    return {
      id: node.id,
      title: node.title,
      location,
      contractType,
      salary,
      category,
      descriptifPoste: details?.descriptifPoste || undefined,
      profilRecherche: details?.profilRecherche || undefined,
      aProposClient: details?.aProposClient || undefined,
      qualification: details?.qualification || undefined,
      anneesExperience: details?.anneesExperience || undefined,
      niveauEtude: details?.niveauEtude || undefined,
    };
  } catch (error) {
    console.error('Erreur getJobById (timeout ou réseau):', error);
    return null;
  }
}