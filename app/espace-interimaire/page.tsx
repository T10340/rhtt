import Header from '@/components/Header';
import Link from 'next/link';

// Données factices (simulant les données synchronisées de l'ERP)
const INTERIMAIRE_MOCK = {
  prenom: 'Alexandre',
  nom: 'Lemoine',
  matricule: 'INT-4092',
  agenceContact: 'Agence Pontault-Combault — 01 60 29 00 43',
  soldes: {
    heuresMoisEnCours: 112,
    tauxMoyen: '14,20 €/h',
    soldeCongesPayesEstime: '420,50 €',
    soldeIfmEstime: '610,00 €',
    dernierAcompte: {
      montant: '200,00 €',
      date: '28 septembre 2026',
      statut: 'Virement effectué',
    },
  },
  missionActuelle: {
    intitule: 'Cariste d’entrepôt CACES 3 & 5',
    entreprise: 'LogistiX France',
    lieu: 'Roissy-en-France (95)',
    debut: '01 septembre 2026',
    finPrevisionnelle: '31 octobre 2026',
    statut: 'En cours',
    tauxHoraire: '13,85 €/h',
  },
  historiqueMissions: [
    {
      id: 'MIS-102',
      intitule: 'Préparateur de commandes',
      entreprise: 'TransLog IdF',
      lieu: 'Aulnay-sous-Bois',
      periode: 'Mai 2026 - Juillet 2026',
      totalHeures: 350,
      statut: 'Terminée',
    },
    {
      id: 'MIS-089',
      intitule: 'Manutentionnaire',
      entreprise: 'BâtiPro Services',
      lieu: 'Meaux',
      periode: 'Mars 2026 - Avril 2026',
      totalHeures: 210,
      statut: 'Terminée',
    },
  ],
  documents: [
    {
      id: 'DOC-01',
      nom: 'Bulletin de paie — Août 2026',
      type: 'PDF',
      date: '11/09/2026',
      taille: '184 Ko',
    },
    {
      id: 'DOC-02',
      nom: 'Bulletin de paie — Juillet 2026',
      type: 'PDF',
      date: '10/08/2026',
      taille: '192 Ko',
    },
    {
      id: 'DOC-03',
      nom: 'Contrat de mission signé — LogistiX France',
      type: 'PDF',
      date: '01/09/2026',
      taille: '340 Ko',
    },
  ],
};

export default function EspaceInterimairePage() {
  const data = INTERIMAIRE_MOCK;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12 w-full space-y-8">
        {/* Bandeau profil */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                Bonjour {data.prenom}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {data.matricule}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Rattaché à : <span className="font-semibold text-slate-700">{data.agenceContact}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors active:scale-[0.99] shadow-xs"
            >
              Demander un acompte
            </button>
            <button
              type="button"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors active:scale-[0.99]"
            >
              Signaler une absence
            </button>
          </div>
        </div>

        {/* Grille d'indicateurs / Soldes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Heures travaillées (Mois en cours)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{data.soldes.heuresMoisEnCours} h</span>
              <span className="text-xs text-slate-500">saisies</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Estimation IFM cumulée
            </span>
            <span className="text-3xl font-black text-blue-600">{data.soldes.soldeIfmEstime}</span>
            <span className="text-xs text-slate-400 block mt-1">Versée en fin de contrat</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Congés Payés (ICCP)
            </span>
            <span className="text-3xl font-black text-slate-900">{data.soldes.soldeCongesPayesEstime}</span>
            <span className="text-xs text-slate-400 block mt-1">Estimation brute</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              Dernier acompte
            </span>
            <span className="text-3xl font-black text-slate-900">{data.soldes.dernierAcompte.montant}</span>
            <span className="text-xs text-emerald-600 font-medium block mt-1">
              ✓ {data.soldes.dernierAcompte.statut}
            </span>
          </div>
        </div>

        {/* Section Mission en cours */}
        {data.missionActuelle && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Mission active
              </span>
              <span className="text-xs font-medium text-slate-500">
                Débutée le {data.missionActuelle.debut}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  {data.missionActuelle.intitule}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Entreprise : <strong className="text-slate-800">{data.missionActuelle.entreprise}</strong> — 📍 {data.missionActuelle.lieu}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-left md:text-right">
                <span className="text-xs text-slate-500 block">Fin de mission prévisionnelle</span>
                <span className="text-sm font-bold text-slate-900">{data.missionActuelle.finPrevisionnelle}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Historique des missions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Historique des missions</h2>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Poste & Client</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Période</th>
                    <th className="py-3 px-4 text-center">Volume</th>
                    <th className="py-3 px-4 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.historiqueMissions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{item.intitule}</div>
                        <div className="text-xs text-slate-500">{item.entreprise} — {item.lieu}</div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell text-slate-600 text-xs">
                        {item.periode}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-xs text-slate-700">
                        {item.totalHeures} h
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          {item.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Colonne droite : Bulletins et Documents RH */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Documents RH</h2>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded">
                      {doc.type}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 truncate">{doc.nom}</p>
                      <p className="text-[11px] text-slate-400">{doc.date} • {doc.taille}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 shrink-0 ml-2"
                  >
                    Télécharger
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Besoin d'une attestation pôle emploi ?</p>
              <p className="text-blue-700">Contactez directement votre chargé de recrutement pour un envoi sous 24h.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}