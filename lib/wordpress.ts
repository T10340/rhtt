const API_URL = process.env.WORDPRESS_API_URL || 'https://wp.rhtt.juyo.fr/graphql';

export interface WPOffreNode {
  id: string;
  title: string;
  detailsOffre: {
    typeContrat: string[] | string | null;
    villeLocalisation: string | null;
    salaire: string | null;
    secteur: string[] | string | null;
  } | null;
}

export interface FormattedJob {
  id: string;
  title: string;
  location: string;
  contractType: string;
  salary: string;
  category: string;
}

export async function getJobs(): Promise<FormattedJob[]> {
  const query = `
    query GetOffres {
      offres {
        nodes {
          id
          title
          detailsOffre {
            typeContrat
            villeLocalisation
            salaire
            secteur
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      // ISR : revalide les données toutes les 60 secondes sans reconstruire le site
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP WordPress: ${res.status}`);
    }

    const { data } = await res.json();
    const nodes: WPOffreNode[] = data?.offres?.nodes || [];

    return nodes.map((node) => {
      // Normalisation des champs liste ou texte
      const rawContract = node.detailsOffre?.typeContrat;
      const contractType = Array.isArray(rawContract)
        ? rawContract[0] || 'Intérim'
        : rawContract || 'Intérim';

      const rawCategory = node.detailsOffre?.secteur;
      const category = Array.isArray(rawCategory)
        ? rawCategory[0] || 'Général'
        : rawCategory || 'Général';

      return {
        id: node.id,
        title: node.title,
        location: node.detailsOffre?.villeLocalisation || 'Île-de-France',
        contractType,
        salary: node.detailsOffre?.salaire || 'À négocier',
        category,
      };
    });
  } catch (error) {
    console.error('Erreur lors du fetch des offres WordPress:', error);
    return [];
  }
}

export interface JobDetail extends FormattedJob {
  content?: string;
}

export async function getJobById(id: string): Promise<JobDetail | null> {
  const query = `
    query GetOffreById($id: ID!) {
      offre(id: $id) {
        id
        title
        content
        detailsOffre {
          typeContrat
          villeLocalisation
          salaire
          secteur
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const { data } = await res.json();
    const node = data?.offre;

    if (!node) return null;

    const rawContract = node.detailsOffre?.typeContrat;
    const contractType = Array.isArray(rawContract)
      ? rawContract[0] || 'Intérim'
      : rawContract || 'Intérim';

    const rawCategory = node.detailsOffre?.secteur;
    const category = Array.isArray(rawCategory)
      ? rawCategory[0] || 'Général'
      : rawCategory || 'Général';

    return {
      id: node.id,
      title: node.title,
      content: node.content,
      location: node.detailsOffre?.villeLocalisation || 'Île-de-France',
      contractType,
      salary: node.detailsOffre?.salaire || 'À négocier',
      category,
    };
  } catch (error) {
    console.error('Erreur getJobById:', error);
    return null;
  }
}