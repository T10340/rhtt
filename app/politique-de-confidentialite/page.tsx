import { User, Phone, Mail, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Map, MapMarker, MapTileLayer } from "@/components/ui/map"
import type { LatLngExpression } from "leaflet"

export function MapWithMarkers() {
  const CITIES = [
    {
      name: "RHTT",
      coordinates: [48.80497720712902, 2.614490465100019] satisfies LatLngExpression,
    }
  ]
  return (
    <Map center={CITIES[0].coordinates} zoom={14}>
      <MapTileLayer />
      {CITIES.map((city) => (
        <MapMarker key={city.name} position={city.coordinates} />
      ))}
    </Map>
  )
}

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
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">Politique de confidentialité</h2>
            <div className="h-1 w-20 bg-[#F48120] mx-auto mt-4 rounded-full"></div>
          </div>

          <div>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-zinc-600 text-left">
                  <strong>Politique de confidentialité</strong><br />
                  <br />
                  <strong>Qui sommes-nous ?</strong><br /><br />
                  RH TT située 25 B avenue de la République, 77340 Pontault Combault, France s’engage à protéger les Données à Caractère Personnel des Utilisateurs.<br />
                  En accédant au site RHTT Interim, les Utilisateurs s’engagent à respecter et à être liés par cette Politique de Confidentialité, qui peut être modifiée ou mise à jour à tout moment sans préavis. Toute modification ou mise à jour seront mises en ligne sur le Site.<br />
                  L’adresse de notre site Web est : www.rhtt-interim.fr<br />
                  <br />
                  <strong>Utilisation des données personnelles collectées</strong><br />
                  <br />
                  <strong>Commentaires</strong><br /><br />
                  Quand vous laissez un commentaire sur notre site web, les données inscrites dans le formulaire de commentaire, mais aussi votre adresse IP et l’agent utilisateur de votre navigateur sont collectés pour nous aider à la détection des commentaires indésirables.<br />
                  Une chaîne anonymisée créée à partir de votre adresse de messagerie (également appelée hash) peut être envoyée au service Gravatar pour vérifier si vous utilisez ce dernier. Les clauses de confidentialité du service Gravatar sont disponibles ici : https://automattic.com/privacy/. Après validation de votre commentaire, votre photo de profil sera visible publiquement à coté de votre commentaire.<br />
                  <br />
                  <strong>Médias</strong><br /><br />
                  Si vous êtes un utilisateur ou une utilisatrice enregistré(e) et que vous téléversez des images sur le site web, nous vous conseillons d’éviter de téléverser des images contenant des données EXIF de coordonnées GPS. Les visiteurs de votre site web peuvent télécharger et extraire des données de localisation depuis ces images.<br />
                  <br />
                  <strong>Formulaires de contact</strong><br /><br />
                  Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par RH TT pour Gestion de notre clientèle, Envoi d’informations par le biais de newsletters<br />
                  Elles sont conservées pendant 3 ans et sont destinées service marketing et au service commercial de l’entreprise et de ses partenaires le cas échéant.<br />
                  Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d’accès aux données vous concernant et les faire rectifier en contactant le responsable de traitement par mail à l’adresse suivante : paivaoscar@orange.fr<br />
                  Nous vous informons de l’existence de la liste d’opposition au démarchage téléphonique « Bloctel », sur laquelle vous pouvez vous inscrire ici : https://conso.bloctel.fr/<br />
                  <br />
                  <strong>Cookies</strong><br /><br />
                  Si vous déposez un commentaire sur notre site, il vous sera proposé d’enregistrer votre nom, adresse de messagerie et site web dans des cookies. C’est uniquement pour votre confort afin de ne pas avoir à saisir ces informations si vous déposez un autre commentaire plus tard. Ces cookies expirent au bout d’un an.<br />
                  Si vous avez un compte et que vous vous connectez sur ce site, un cookie temporaire sera créé afin de déterminer si votre navigateur accepte les cookies. Il ne contient pas de données personnelles et sera supprimé automatiquement à la fermeture de votre navigateur.<br />
                  Lorsque vous vous connecterez, nous mettrons en place un certain nombre de cookies pour enregistrer vos informations de connexion et vos préférences d’écran. La durée de vie d’un cookie de connexion est de deux jours, celle d’un cookie d’option d’écran est d’un an. Si vous cochez « Se souvenir de moi », votre cookie de connexion sera conservé pendant deux semaines. Si vous vous déconnectez de votre compte, le cookie de connexion sera effacé.<br />
                  En modifiant ou en publiant un article, un cookie supplémentaire sera enregistré dans votre navigateur. Ce cookie ne comprend aucune donnée personnelle. Il indique simplement l’identifiant de l’article que vous venez de modifier. Il expire au bout d’un jour.<br />
                  <br />
                  <strong>Types de cookies utilisés</strong><br />
                  <br />
                  <strong>Cookies nécessaires à la navigation</strong><br /><br />
                  Les cookies nécessaires contribuent à rendre un site Web utilisable en activant des fonctions de base comme la navigation de page et l’accès aux zones sécurisées du site Web. Le site Web ne peut pas fonctionner correctement sans ces cookies.<br />
                  <br />
                  <strong>Cookies de préférences</strong><br /><br />
                  Les cookies de préférences permettent à un site Web de retenir des informations qui modifient la manière dont le site se comporte ou s’affiche, comme votre langue préférée ou la région dans laquelle vous vous situez.<br />
                  <br />
                  <strong>Cookies statistiques</strong><br /><br />
                  Les cookies statistiques aident les propriétaires du site Web, par la collecte et la communication d’informations de manière anonyme, à comprendre comment les visiteurs interagissent avec les sites Web.<br />
                  <br />
                  <strong>Cookies marketing</strong><br /><br />
                  Les cookies marketing sont utilisés pour effectuer le suivi des visiteurs au travers des sites Web. Le but est d’afficher des publicités qui sont pertinentes et intéressantes pour l’utilisateur individuel et donc plus précieuses pour les éditeurs et annonceurs tiers.<br />
                  <br />
                  <strong>Comment paramétrer les cookies</strong><br /><br />
                  Vous pouvez à tout moment choisir de désactiver les cookies, les refuser au cas par cas ou systématiquement. Vous pouvez paramétrer votre navigateur pour vous signaler les cookies qui y sont déposés ou vous demander de les accepter ou pas.<br />
                  Vous êtes informé que le paramétrage est susceptible de modifier vos conditions d’accès à nos contenus et d’utilisation de services qui demandent l’utilisation de cookies. Ainsi, si vous paramétrez votre navigateur pour refuser l’ensemble des cookies, vous ne pourrez pas profiter d’une partie de nos services. Il est donc conseillé de paramétrer votre navigateur en tenant compte de la finalité des cookies.<br />
                  Votre opposition à l’installation ou à l’utilisation d’un cookie sera prise en compte par l’installation d’un cookie de refus sur votre terminal. Vous devrez donc prêter attention à pas supprimer ce cookie de refus si vous souhaitez que votre choix soit pris en compte.<br />
                  <br />
                  <strong>Paramétrer votre navigateur</strong><br /><br />
                  Vous utilisez le navigateur Internet Explorer.<br />
                  Vous utilisez le navigateur Firefox.<br />
                  Vous utilisez le navigateur Safari.<br />
                  Vous utilisez le navigateur Google Chrome.<br />
                  <br />
                  <strong>Contenu embarqué depuis d’autres sites</strong><br /><br />
                  Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles…). Le contenu intégré depuis d’autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site.<br />
                  Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d’un compte connecté sur leur site web.<br />
                  <br />
                  <strong>Statistiques et mesures d’audience</strong><br /><br />
                  Afin de pouvoir suivre l’audience de son site, RH TT utilise Google Analytics. Pour en savoir plus les principes de confidentialité et de sécurité de Google Analytics, nous vous invitons à consulter la page suivante :<br />
                  https://www.google.com/analytics/learn/privacy.html?hl=fr<br />
                  <br />
                  <strong>Utilisation et transmission de vos données personnelles</strong><br /><br />
                  Par défaut, nous ne partageons vos données personnelles avec aucun tiers.<br />
                  <br />
                  <strong>Durées de stockage de vos données</strong><br /><br />
                  Si vous laissez un commentaire, le commentaire et ses métadonnées sont conservés indéfiniment. Cela permet de reconnaître et approuver automatiquement les commentaires suivants au lieu de les laisser dans la file de modération.<br />
                  Pour les utilisateurs et utilisatrices qui s’enregistrent sur notre site, nous stockons également les données personnelles indiquées dans leur profil. Tous les utilisateurs et utilisatrices peuvent voir, modifier ou supprimer leurs informations personnelles à tout moment (à l’exception de leur nom d’utilisateur·ice). Les gestionnaires du site peuvent aussi voir et modifier ces informations.<br />
                  <br />
                  <strong>Les droits que vous avez sur vos données</strong><br /><br />
                  Si vous avez un compte ou si vous avez laissé des commentaires sur le site, vous pouvez demander à recevoir un fichier contenant toutes les données personnelles que nous possédons à votre sujet, incluant celles que vous nous avez fournies. Vous pouvez également demander la suppression des données personnelles vous concernant. Cela ne prend pas en compte les données stockées à des fins administratives, légales ou pour des raisons de sécurité.<br />
                  <br />
                  <strong>Transmission de vos données personnelles</strong><br /><br />
                  Les commentaires des visiteurs peuvent être vérifiés à l’aide d’un service automatisé de détection des commentaires indésirables.<br />
                  <br />
                  <strong>Informations de contact</strong><br /><br />
                  Vous pouvez demander la modification de vos données personnelles en nous envoyant un mail à l’adresse suivante : paivaoscar@orange.fr<br />
                  <br />
                  <strong>Informations supplémentaires</strong><br />
                  <br />
                  <strong>Les droits que vous avez sur vos données</strong><br /><br />
                  Si vous avez un compte ou si vous avez laissé des commentaires sur le site, vous pouvez demander à recevoir un fichier contenant toutes les données personnelles que nous possédons à votre sujet, incluant celles que vous nous avez fournies. Vous pouvez également demander la suppression des données personnelles vous concernant. Cela ne prend pas en compte les données stockées à des fins administratives, légales ou pour des raisons de sécurité.<br />
                  <br />
                  <strong>Comment nous protégeons vos données</strong><br /><br />
                  Vos données sont stockées en base de données et accessibles uniquement par le personnel habilité. Des logins et mots de passe cryptés personnels sont utilisés à ces fins.<br />
                  <br />
                  <strong>Procédures mises en œuvre en cas de fuite de données</strong><br /><br />
                  En cas de fuite de données, nous nous conformerons scrupuleusement à la procédure prévue par le règlement général sur la protection des données (article 33).<br />
                  <br />
                  <strong>Les services tiers qui nous transmettent des données</strong><br /><br />
                  Le service Google Analytics nous transmet un certain nombre de données statistiques concernant les visiteurs de notre site www.rhtt-interim.fr. Ces données sont conservées chez Google pendant 26 mois.<br />
                  Pour en savoir plus les principes de confidentialité et de sécurité de Google Analytics, nous vous invitons à consulter la page suivante :<br />
                  https://www.google.com/analytics/learn/privacy.html?hl=fr<br />
                  Vous avez la possibilité de désactiver ce tracking en téléchargeant ce module.<br /><br />
                  <br />
                  <strong>Opérations de marketing automatisé et/ou de profilage réalisées à l’aide des données personnelles</strong><br /><br />
                  Dans le cas d’un commentaire laissé ou d’un formulaire de contact soumis sur un des articles de notre blog, vos coordonnées seront utilisées par nos équipes marketing pour vous prendre contact avec vous le cas échéant.<br />
                  <br />
                  <strong>Dernière mise à jour le 16/04/2026</strong><br />
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
            <div className="h-68 bg-zinc-800 rounded-lg w-full flex items-center justify-center overflow-hidden">
              <MapWithMarkers />
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
    </main >
  );
}