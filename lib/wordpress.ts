const API_URL = process.env.WORDPRESS_API_URL || 'https://wp.rhtt.juyo.fr/graphql';

export interface WPOffreDetails {
  typeContrat?: string[] | string | null;
  villelocalisation?: string[] | string | null;
  villeLocalisation?: string[] | string | null;
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
  slug: string; // <-- On récupère le slug de l'offre (ex: "test")
  title: string;
  detailsOffre: WPOffreDetails | null;
}

export interface FormattedJob {
  id: string; // Contiendra le slug pour des URL propres
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
      const location = extractValue(
        details?.villelocalisation || details?.villeLocalisation,
        'Île-de-France'
      );
      const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

      return {
        id: node.slug, // <-- Next.js utilisera le slug pour le lien (ex: /offres/test)
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
  // id contient désormais le slug envoyé par Next.js
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
    const location = extractValue(
      details?.villelocalisation || details?.villeLocalisation,
      'Île-de-France'
    );
    const salary = details?.salaire ? `${details.salaire} €` : 'À négocier';

    return {
      id: node.slug,
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
    console.error('Erreur getJobById:', error);
    return null;
  }
}