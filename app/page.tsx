import { Search, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* HEADER / NAV */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-black tracking-tighter">
          <span className="text-[#F48120]">RH</span><span className="text-[#643494]">TT</span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost" className="text-zinc-600 font-medium hidden sm:inline-flex">
            Espace Entreprise
          </Button>
          <Button className="bg-[#643494] hover:bg-[#502976] text-white">
            Connexion Candidat
          </Button>
        </div>
      </header>

      {/* HERO SECTION WITH SEARCH BAR */}
      <section className="relative bg-zinc-900 py-24 px-6 overflow-hidden">
        {/* Subtle BTP background image with dark overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888081622-297eb098197d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>

        <div className="relative max-w-5xl mx-auto space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Votre prochain chantier commence <span className="text-[#F48120]">ici</span>.
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Spécialiste de l'intérim et du recrutement dans le BTP. Trouvez des missions qui correspondent à votre savoir-faire ou recrutez vos futurs talents.
          </p>

          {/* THE SEARCH BAR */}
          <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Métier, mot-clé (ex: Maçon, Grutier)..."
                className="pl-10 border-0 focus-visible:ring-0 shadow-none text-lg h-12"
              />
            </div>
            <div className="hidden md:block w-px bg-zinc-200 my-2"></div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Ville ou Code Postal..."
                className="pl-10 border-0 focus-visible:ring-0 shadow-none text-lg h-12"
              />
            </div>
            <Button className="bg-[#F48120] hover:bg-[#D97018] text-white h-12 px-8 text-lg font-semibold w-full md:w-auto">
              Rechercher
            </Button>
          </div>
        </div>
      </section>

      {/* RECENT BTP JOBS FEED */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">Missions récentes en BTP</h2>
            <p className="text-zinc-500 mt-2">Dernières offres publiées par nos agences.</p>
          </div>
          <Button variant="outline" className="text-[#643494] border-[#643494] hover:bg-purple-50">
            Voir toutes les offres <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* JOB CARD 1 */}
          <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#F48120] hover:bg-[#D97018] text-white">Intérim</Badge>
                <span className="text-sm text-zinc-400">Il y a 2h</span>
              </div>
              <CardTitle className="text-xl font-bold text-zinc-900">Chef de Chantier Gros Œuvre</CardTitle>
              <div className="flex items-center text-zinc-500 mt-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-1" /> Pontault-Combault (77)
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 line-clamp-3 text-sm">
                Pour le compte de notre client, acteur majeur de la construction, nous recherchons un Chef de Chantier expérimenté pour superviser des chantiers de logements collectifs.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">Postuler</Button>
            </CardFooter>
          </Card>

          {/* JOB CARD 2 */}
          <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#643494] hover:bg-[#502976] text-white">CDI</Badge>
                <span className="text-sm text-zinc-400">Aujourd'hui</span>
              </div>
              <CardTitle className="text-xl font-bold text-zinc-900">Conducteur de Grue à Tour</CardTitle>
              <div className="flex items-center text-zinc-500 mt-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-1" /> Paris 15e (75)
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 line-clamp-3 text-sm">
                RHTT recherche un grutier qualifié (CACES R487) pour un chantier de longue durée. Précision et respect des consignes de sécurité obligatoires.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">Postuler</Button>
            </CardFooter>
          </Card>

          {/* JOB CARD 3 */}
          <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#F48120] hover:bg-[#D97018] text-white">Intérim</Badge>
                <span className="text-sm text-zinc-400">Hier</span>
              </div>
              <CardTitle className="text-xl font-bold text-zinc-900">Maçon Coffreur Bancheur</CardTitle>
              <div className="flex items-center text-zinc-500 mt-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-1" /> Marne-la-Vallée (77)
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 line-clamp-3 text-sm">
                Mission d'intérim de 3 mois renouvelable. Vous interviendrez sur le coulage du béton, le montage et démontage des banches sur chantier neuf.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">Postuler</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}