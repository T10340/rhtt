import { Search, MapPin, User, CheckCircle2, Phone, Mail, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      {/* HEADER / NAV */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-black tracking-tighter">
            <span className="text-[#F48120]">RH</span><span className="text-[#643494]">TT</span>
          </div>
          <span className="text-sm font-medium text-zinc-500 hidden md:inline-block border-l border-zinc-300 pl-2 ml-2">Intérim & recrutement</span>
        </div>

        <nav className="hidden lg:flex space-x-6 text-sm font-medium text-zinc-600">
          <a href="#" className="hover:text-[#F48120] transition-colors">Accueil</a>
          <a href="#" className="hover:text-[#F48120] transition-colors">Découvrir une offre</a>
          <a href="#" className="hover:text-[#F48120] transition-colors">Postuler</a>
          <a href="#" className="hover:text-[#F48120] transition-colors">Offres d&apos;emploi</a>
          <a href="#" className="hover:text-[#F48120] transition-colors">Contact</a>
        </nav>

        <div>
          <Button variant="outline" className="text-[#643494] border-[#643494] hover:bg-purple-50 hidden sm:inline-flex rounded-lg">
            <User className="mr-2 h-4 w-4" />
            Accès Entreprises
          </Button>
        </div>
      </header>

      {/* HERO SECTION WITH SEARCH BAR */}
      <section className="relative bg-zinc-900 py-24 px-6 overflow-hidden">
        {/* Subtle BTP background image with dark overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888081622-297eb098197d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>

        <div className="relative max-w-5xl mx-auto space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Agence d&apos;Intérim & Recrutement <br />
            <span className="text-[#F48120]">BTP, Tertiaire, Industrie & Transports.</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Notre agence d&apos;intérim situé à Pontault-Combault en Seine et Marne (77) se charge de mettre en relation les entreprises à la recherche de compétences avec les candidats en recherche d&apos;emploi. RHTT propose des emplois en intérim, mais également en CDD ou CDI.
          </p>

          {/* THE SEARCH BAR */}
          <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Métier, mot-clé..."
                className="pl-10 border-0 focus-visible:ring-0 shadow-none text-lg h-12 rounded-md"
              />
            </div>
            <div className="hidden md:block w-px bg-zinc-200 my-2"></div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Ville ou Code Postal..."
                className="pl-10 border-0 focus-visible:ring-0 shadow-none text-lg h-12 rounded-md"
              />
            </div>
            <Button className="bg-[#F48120] hover:bg-[#D97018] text-white h-12 px-8 text-lg font-semibold w-full md:w-auto rounded-md">
              Rechercher
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button size="lg" className="bg-[#F48120] hover:bg-[#D97018] text-white font-semibold rounded-lg h-14 px-8 text-lg shadow-lg">
              Espace Entreprises
            </Button>
            <Button size="lg" className="bg-[#643494] hover:bg-[#502976] text-white font-semibold rounded-lg h-14 px-8 text-lg shadow-lg">
              Espace Candidats
            </Button>
          </div>
        </div>
      </section>

      {/* DOMAINES D'INTERVENTION */}
      <section className="bg-white py-20 px-6 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">Nos Domaines d&apos;Intervention</h2>
            <div className="h-1 w-20 bg-[#F48120] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-zinc-50 group">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-[#F48120] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48120] group-hover:text-white transition-colors duration-300"><path d="M14 14.76V3.5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v11.26l-4.29 2.15a2 2 0 0 0-1.11 1.79V22h18v-3.3a2 2 0 0 0-1.11-1.79Z" /></svg>
                </div>
                <h3 className="font-bold text-lg text-zinc-800">BTP</h3>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-zinc-50 group">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-[#F48120] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48120] group-hover:text-white transition-colors duration-300"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
                </div>
                <h3 className="font-bold text-lg text-zinc-800">TERTIAIRE</h3>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-zinc-50 group">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-[#F48120] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48120] group-hover:text-white transition-colors duration-300"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /><path d="M8 14 4 10" /><path d="m14 8 4-4" /></svg>
                </div>
                <h3 className="font-bold text-lg text-zinc-800">INDUSTRIE</h3>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-zinc-50 group">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-[#F48120] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48120] group-hover:text-white transition-colors duration-300"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
                </div>
                <h3 className="font-bold text-lg text-zinc-800">TRANSPORTS</h3>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-zinc-50 group col-span-2 md:col-span-1 lg:col-span-1 mx-auto w-full max-w-[200px] lg:max-w-none">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full group-hover:bg-[#F48120] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48120] group-hover:text-white transition-colors duration-300"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                </div>
                <h3 className="font-bold text-lg text-zinc-800">ESPACES VERTS</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-zinc-900 py-20 px-6 text-white relative">
        <div className="absolute inset-0 bg-[#643494] opacity-10 mix-blend-multiply"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">RHTT Interim en Chiffre</h2>
            <div className="h-1 w-20 bg-[#F48120] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800">
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#F48120] mb-2">180</span>
              <span className="text-zinc-400 font-medium text-lg">Personnes en poste</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#F48120] mb-2">2700</span>
              <span className="text-zinc-400 font-medium text-lg">Recrutements par an</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#F48120] mb-2">450</span>
              <span className="text-zinc-400 font-medium text-lg">Entreprises clientes</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-[#F48120] mb-2">110</span>
              <span className="text-zinc-400 font-medium text-lg">Postes à pourvoir</span>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-zinc-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">Méthode éprouvée pour efficacité prouvée</h2>
                <div className="h-1 w-20 bg-[#643494] mt-4 rounded-full"></div>
              </div>
              <ul className="space-y-6">
                {[
                  "Définition du poste et du profil recherché",
                  "Recherche de candidats (sourcing, CVthèque, réseaux)",
                  "Entretiens de sélection et tests de compétences",
                  "Présentation des profils retenus",
                  "Suivi d'intégration et accompagnement"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#643494] shrink-0 mt-0.5" />
                    <span className="text-lg text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">La bonne personne à la bonne place !</h2>
            <div className="h-1 w-20 bg-[#F48120] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-[#643494] font-bold text-xl">1</div>
                <h3 className="font-bold text-xl text-zinc-900">Expérience</h3>
                <p className="text-zinc-600">Des années d&apos;expertise dans nos domaines de prédilection.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-[#643494] font-bold text-xl">2</div>
                <h3 className="font-bold text-xl text-zinc-900">Equipe</h3>
                <p className="text-zinc-600">Une équipe dédiée à l&apos;écoute de vos besoins spécifiques.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-[#643494] font-bold text-xl">3</div>
                <h3 className="font-bold text-xl text-zinc-900">Administratif</h3>
                <p className="text-zinc-600">Gestion complète de la paie, des contrats et des déclarations.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-[#643494] font-bold text-xl">4</div>
                <h3 className="font-bold text-xl text-zinc-900">Accompagnement</h3>
                <p className="text-zinc-600">Un suivi personnalisé de la mission au recrutement final.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <footer className="bg-zinc-900 text-zinc-300">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 border-b border-zinc-800">

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div>
              <div className="text-4xl font-black tracking-tighter mb-6 text-white">
                <span className="text-[#F48120]">RH</span><span className="text-[#643494]">TT</span>
              </div>
              <p className="text-zinc-400 max-w-sm">
                Votre partenaire de confiance pour l&apos;intérim et le recrutement BTP, Tertiaire, Industrie et Transports.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-[#F48120] shrink-0" />
                <p>123 Avenue de la République<br />77340 Pontault-Combault</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-[#F48120] shrink-0" />
                <p>01 23 45 67 89</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-[#F48120] shrink-0" />
                <p>contact@rhtt-interim.fr</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 bg-zinc-800 rounded-lg w-full flex items-center justify-center overflow-hidden">
              <div className="text-zinc-500 font-medium">Google Maps Integration</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Nous contacter</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Nom</label>
                  <Input className="bg-zinc-900 border-zinc-700 text-white focus-visible:ring-[#F48120]" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Téléphone</label>
                  <Input className="bg-zinc-900 border-zinc-700 text-white focus-visible:ring-[#F48120]" placeholder="Votre téléphone" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email</label>
                <Input type="email" className="bg-zinc-900 border-zinc-700 text-white focus-visible:ring-[#F48120]" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Objet</label>
                <Input className="bg-zinc-900 border-zinc-700 text-white focus-visible:ring-[#F48120]" placeholder="Objet de votre demande" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <Textarea className="bg-zinc-900 border-zinc-700 text-white min-h-[120px] focus-visible:ring-[#F48120]" placeholder="Comment pouvons-nous vous aider ?" />
              </div>
              <Button className="w-full bg-[#F48120] hover:bg-[#D97018] text-white font-semibold h-12 mt-4">
                Envoyer le message
              </Button>
            </form>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} RHTT Intérim. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="http://localhost:3000/mentions-legales" className="hover:text-zinc-300 transition-colors">Mentions légales</a>
            <a href="http://localhost:3000/politique-de-confidentialite" className="hover:text-zinc-300 transition-colors">Politique de confidentialité</a>
            <a href="https://juyo.fr" className="hover:text-zinc-300 transition-colors">Site réalisé par l'agence JUYO</a>
          </div>
        </div>
      </footer>
    </main>
  );
}