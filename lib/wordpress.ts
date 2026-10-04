const API_URL = process.env.WORDPRESS_API_URL || 'https://wp.rhtt.juyo.fr/graphql';

export interface WPOffreDetails {
  typeContrat?: string[] | string | null; // Majuscule corrigée
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
  slug: string;
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
  niveauDetude?: string;
}

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

    if (!res.ok) {
      console.error(`Erreur HTTP WordPress: ${res.status}`);
      return [];
    }

    const result = await res.json();
    
    if (result.errors) {
      console.error('Erreurs GraphQL dans getJobs:', result.errors);
    }

    const nodes: WPOffreNode[] = result.data?.offres?.nodes || [];

    return nodes.map((node) => {
      const details = node.detailsOffre;
      const contractType = extractValue(details?.typeContrat, 'Intérim');
      const category = extractValue(details?.secteur, 'Général');
      const location = extractValue(details?.villelocalisation, 'Île-de-France');
      const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

      return {
        id: node.slug,
        title: node.title,
        location,
        contractType,
        salary,
        category,
      };
    });
  } catch (error) {
    console.error('Erreur getJobs:', error);
    return [];
  }
}

export async function getJobById(id: string): Promise<JobDetail | null> {
  const query = `
    query GetOffreById($id: ID!) {
      offre(id: $id, idType: SLUG) {
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
        variables: { id },
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
      id: node.slug,
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
      niveauDetude: details?.niveauDetude || undefined,
    };
  } catch (error) {
    console.error('Erreur getJobById:', error);
    return null;
  }
}