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

      {/* METHODOLOGY SECTION */}
      <section className="py-15 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">Mentions légales</h2>
            <div className="h-1 w-20 bg-[#F48120] mx-auto mt-4 rounded-full"></div>
          </div>

          <div>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-zinc-600 text-left">
                  <strong>L'éditeur du site</strong><br /><br />
                  Siège social : 25 B avenue de la République – 77340 PONTAULT COMBAULT<br />
                  <br />
                  Téléphone : 01 60 29 00 43<br />
                  <br />
                  Mail : paivaoscar(arobase)orange.fr<br />
                  <br />
                  SARL au Capital de 300 000 €<br />
                  <br />
                  N° d’immatriculation au Registre du Commerce : 453 916 678<br />
                  <br />
                  N° TVA Intracommunautaire : FR26453916678<br />
                  <br />
                  Directeur de la publication : Oscar PAIVA TAVARES FONCALVES (Gérant)<br />
                  <br />
                  Responsable de la rédaction : Oscar PAIVA TAVARES FONCALVES<br />
                  <br />
                  <strong>Hébergeur :</strong><br />
                  <br />
                  OVH<br />
                  2 rue Kellermann – 59100 Roubaix<br />
                  <br />
                  Téléphone : 1007<br />
                  <br />
                  Webmestre : Jérôme CHERQUI<br />
                  <br />
                  Création de site internet : CAP VISIBILITE<br />
                  <br />
                  <strong>Données personnelles :</strong><br /><br />
                  L’utilisateur du présent site (ci-après dénommée « Utilisateur ») est informé que, lors de sa navigation sur le site www.rhtt-interim.fr/ (ci-après dénommé « Site »), des données à caractère personnel le concernant sont collectées et traitées par RH TT (Pontault Combault).<br />
                  <br />
                  L’Utilisateur du Site est informé que ses données :<br />
                  – sont collectées de manière loyale et licite,<br />
                  – sont collectées pour des finalités déterminées,<br />
                  – explicites et légitimes,<br />
                  – ne seront pas traitées ultérieurement de manière incompatible avec ces finalités,<br />
                  – sont adéquates, pertinentes et non excessives au regard des finalités pour lesquelles elles sont collectées et de leurs traitements ultérieurs,<br />
                  – sont exactes et complètes,<br />
                  – sont conservées sous une forme permettant l’identification des personnes concernées pendant une durée qui n’excède pas la durée nécessaire aux finalités pour lesquelles elles sont collectées et traitées.<br />
                  <br />
                  RH TT s’engage à prendre toutes précautions utiles pour préserver la sécurité des données, et notamment pour éviter qu’elles ne soient déformées, endommagées ou que des tiers non autorisés y aient accès. Ces données sont utilisées à des fins commerciales internes.<br />
                  Les informations recueillies auprès des internautes par le biais des formulaires disponibles sur le site internet www.rhtt-interim.fr/ sont conformes aux dispositions prévues par la loi N. 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés.<br />
                  <br />
                  Le destinataire des données à caractère personnel concernant l’Utilisateur est RH TT. Ces données ne sont pas destinées à être transmises à des tiers.<br />
                  <br />
                  <strong>Liens présents sur le site :</strong><br /><br />
                  Les liens présents sur ce site peuvent orienter l’utilisateur sur des sites extérieurs dont le contenu ne peut en aucune manière engager la responsabilité de la rédaction du site RH TT.<br />
                  <br />
                  <strong>Utilisations de cookies :</strong><br /><br />
                  L’Utilisateur est informé que RH TT est susceptible d’implanter un cookie dans son ordinateur. Un cookie ne permet pas d’identifier l’Utilisateur. Cependant, il permet d’enregistrer des informations relatives à la navigation de son ordinateur sur le Site, informations qui pourront être lues lors de ses prochaines visites. Ces informations sont conservées sur l’ordinateur de l’Utilisateur. Toutefois, l’Utilisateur peut, s’il le souhaite, s’opposer à l’enregistrement de cookies sur son ordinateur, en procédant comme suit :<br />
                  <br />
                  – Pour Mozilla Firefox : Choisir le menu “outil ” puis “Options” Cliquer sur l’icône “vie privée” Repérer le menu “cookie” et sélectionner les options qui conviennent.<br />
                  <br />
                  – Pour Microsoft Internet Explorer 6.0 : choisir le menu “Outils” (ou “Tools”), puis “Options Internet” (ou “Internet Options”). Cliquer sur l’onglet “Confidentialité” (ou “Confidentiality”) sélectionner le niveau souhaité à l’aide du curseur.<br />
                  <br />
                  – Pour Microsoft Internet Explorer 5 : choisir le menu “Outils” (ou “Tools”), puis “Options Internet” (ou “Internet Options”). Cliquer sur l’onglet “Sécurité” ou « Security ») Sélectionner « Internet » puis « Personnaliser le niveau » (ou « CustomLevel »). Repérer la rubrique « cookies » et choisir l’option qui convient.<br />
                  <br />
                  – Pour Netscape 6.X et 7. X : choisir le menu “Edition” – “Préférences” Confidentialité et Sécurité Cookies.<br />
                  <br />
                  – Pour Opéra 6.0 et au-delà : choisir le menu “Fichier” – “Préférences” Vie Privée (Variante 2 : Site Internet avec cookies incluant des informations fournies par l’utilisateur).<br />
                  <br />
                  L’Utilisateur a le droit de s’opposer à ce que des données à caractère personnel le concernant fassent l’objet d’un traitement et à ce que ces données soient utilisées à des fins de prospection, notamment commerciale. L’Utilisateur, après avoir justifié de son identité, peut interroger RH TT en vue d’obtenir la confirmation que des données à caractère personnel le concernant font ou ne font pas l’objet de ce traitement, des informations relatives aux finalités du traitement, aux catégories de données à caractère personnel traitées et aux destinataires ou aux catégories de destinataires auxquels les données sont communiquées, la communication des données à caractère personnel qui le concernent ainsi que de toute information disponible quant à l’origine de celles-ci, les informations permettant de connaître et contester la logique qui sous-tend le traitement automatisé en cas de décision prise sur le fondement de celui-ci et produisant des effets juridiques à son égard.<br />
                  <br />
                  L’Utilisateur peut également, s’il justifie de son identité, exiger de RH TT que soient rectifiées, complétées, mises à jour, verrouillées ou effacées les données à caractère personnel le concernant, qui seraient inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l’utilisation, la communication ou la conservation est interdite. Afin d’exercer ce droit, l’Utilisateur enverra un courrier à RH TT en sa qualité de responsable du traitement, à l’adresse suivante : paivaoscar(arobase)orange.fr<br />
                  <br />
                  <strong>Formulaires de contact</strong><br /><br />
                  Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par RH TT pour Gestion de notre clientèle, Envoi d’informations par le biais de newsletters<br />
                  <br />
                  Elles sont conservées pendant 3 ans et sont destinées service marketing et au service commercial de l’entreprise et de ses partenaires le cas échéant.<br />
                  <br />
                  Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d’accès aux données vous concernant et les faire rectifier en contactant le responsable de traitement par mail à l’adresse suivante : paivaoscar@orange.fr<br />
                  <br />
                  Nous vous informons de l’existence de la liste d’opposition au démarchage téléphonique « Bloctel », sur laquelle vous pouvez vous inscrire ici : https://conso.bloctel.fr/<br />
                  <br />
                  <strong>Propriété intellectuelle :</strong><br /><br />
                  Les éléments figurant au sein du présent site, tels que sons, images, photographies, vidéos, écrits, animations, programmes, charte graphique, utilitaires, bases de données, logiciel, sont protégés par les dispositions du Code de la propriété intellectuelle et appartiennent à RH TT. L’utilisateur s’interdit de porter atteinte aux droits de propriété intellectuelle afférents à ces éléments et notamment de les reproduire, représenter, modifier, adapter, traduire, d’en extraire et/ou réutiliser une partie qualitativement ou quantitativement substantielle, à l’exclusion des actes nécessaires à leur usage normal et conforme.<br />
                  <br />
                  <strong>Crédits photos :</strong><br /><br />
                  Sources des photos ou illustrations en ligne : Les droits d’auteurs et droits de propriété intellectuelle appartiennent à Fotolia ou à ses contributeurs. Ces Oeuvres ont fait l’objet d’un contrat pour le téléchargement de contenu entre la société RH TT et la banque d’images Fotolia.<br />
                  <br />
                  Sources :<br />
                  <br />
                  www.unsplash.com<br />
                  www.fr.fotolia.com<br />
                  www.fr.freepik.com<br />
                  www.pixabay.com<br />
                  www.pexels.com<br />
                  www.flaticon.com<br />
                  <br />
                  <strong>Avertissements :</strong><br /><br />
                  RH TT décline toute responsabilité en cas d’erreur ou d’omission.<br />
                  <br />
                  Pour signaler une erreur ou demander la rectification d’informations, n’hésitez pas à contacter le webmestre en remplissant le formulaire de contact.<br />
                  <br />
                  Les informations techniques qui se trouvent sur ce site n’ont qu’une valeur informative et sont susceptibles d’évoluer en fonction des modifications législatives et réglementaires.<br />
                  <br />
                  RH TT ne peut être tenue responsable de l’interprétation que vous pourriez faire des informations ou renseignements contenues dans ce site.<br />
                  <br />
                  Il appartient à l’utilisateur de ce site de prendre toutes les mesures appropriées de façon à protéger ses propres données et/ou logiciels de la contamination par d’éventuels virus circulant sur le réseau Internet. RH TT décline toute responsabilité d’un éventuel dommage survenu pendant la consultation du présent site.<br />
                </p>
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
            <a href="#" className="hover:text-zinc-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">CGU</a>
          </div>
        </div>
      </footer>
    </main>
  );
}