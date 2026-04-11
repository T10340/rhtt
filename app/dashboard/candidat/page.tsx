"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Briefcase, Building, Upload, User } from "lucide-react"

export default function CandidatDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Espace Candidat</h1>
          <p className="text-muted-foreground">Bienvenue Jean. Gérez votre profil et suivez vos candidatures.</p>
        </div>
        <Button className="bg-[#643494] hover:bg-[#522b7a]">Chercher une mission</Button>
      </div>

      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profil">Mon Profil</TabsTrigger>
          <TabsTrigger value="visuels">Visuels</TabsTrigger>
          <TabsTrigger value="activite">Mon Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="profil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Informations d&apos;identification</CardTitle>
              <CardDescription>Mettez à jour vos informations de base.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" defaultValue="Dupont" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" defaultValue="Jean" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Input id="age" type="number" defaultValue="32" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse complète</Label>
                  <Input id="adresse" defaultValue="12 Rue de Paris, 75001 Paris" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Informations personnelles</CardTitle>
              <CardDescription>Parlez-nous de votre expérience et de vos compétences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Description / Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Ouvrier spécialisé dans le BTP avec plus de 10 ans d'expérience. Ponctuel, rigoureux et autonome."
                />
              </div>

              <div className="space-y-2">
                <Label>Compétences clés</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Maçonnerie</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Lecture de plan</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Travail en équipe</Badge>
                </div>
                <Input placeholder="Ajouter une compétence... (Appuyez sur Entrée)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certifs">Certifications (ex: CACES)</Label>
                  <Input id="certifs" defaultValue="CACES 1, CACES 3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diplomes">Diplômes</Label>
                  <Input id="diplomes" defaultValue="CAP Maçonnerie" />
                </div>
              </div>

              <Button className="bg-[#643494] hover:bg-[#522b7a]">Sauvegarder les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visuels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Apparence du profil</CardTitle>
              <CardDescription>Personnalisez votre photo et votre bannière.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-4">
                  <Label>Photo de profil</Label>
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-zinc-200 flex items-center justify-center border-2 border-dashed border-zinc-300">
                      <User className="h-8 w-8 text-zinc-400" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Changer la photo
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG ou GIF. Max 2Mo.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 w-full">
                  <Label>Bannière</Label>
                  <div className="h-32 w-full rounded-lg bg-zinc-100 flex items-center justify-center border-2 border-dashed border-zinc-300">
                    <div className="text-center space-y-2">
                      <Upload className="h-8 w-8 text-zinc-400 mx-auto" />
                      <p className="text-sm font-medium text-zinc-600">Glissez-déposez votre image ici</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activite" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600">Contrat en cours</CardTitle>
                <Briefcase className="h-4 w-4 text-[#F48120]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">Chef d&apos;équipe BTP</div>
                <p className="text-xs text-muted-foreground mt-1">Chez Vinci Construction - Fin dans 42 jours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600">Secteurs préférés</CardTitle>
                <Building className="h-4 w-4 text-[#643494]" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mt-1">
                  <Badge className="bg-[#643494]">BTP</Badge>
                  <Badge variant="outline">Industrie</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Historique des missions</CardTitle>
              <CardDescription>Consultez vos candidatures passées et à venir.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Poste</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Chauffeur Poids Lourd</TableCell>
                    <TableCell>Transports XYZ</TableCell>
                    <TableCell>12/06/2024</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Chef d&apos;équipe BTP</TableCell>
                    <TableCell>Vinci Construction</TableCell>
                    <TableCell>01/05/2024</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">En cours</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ouvrier Polyvalent</TableCell>
                    <TableCell>Eiffage</TableCell>
                    <TableCell>15/02/2024</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-zinc-100 text-zinc-800">Terminée</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Magasinier</TableCell>
                    <TableCell>Logistique Pro</TableCell>
                    <TableCell>10/01/2024</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-red-100 text-red-800">Non aboutie</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
