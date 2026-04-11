"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Briefcase, FileCheck2, Upload, Users, Image as ImageIcon } from "lucide-react"

export default function EntrepriseDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Espace Entreprise</h1>
          <p className="text-muted-foreground">Bienvenue Vinci Construction. Gérez vos offres et vos intérimaires.</p>
        </div>
        <Button className="bg-[#F48120] hover:bg-[#d9731c]">Créer une nouvelle offre</Button>
      </div>

      <Tabs defaultValue="informations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="informations">Informations Entreprise</TabsTrigger>
          <TabsTrigger value="marque">Marque Employeur</TabsTrigger>
          <TabsTrigger value="missions">Gestion des Missions</TabsTrigger>
        </TabsList>

        <TabsContent value="informations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Identification de l&apos;entreprise</CardTitle>
              <CardDescription>Mettez à jour les coordonnées et informations légales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de l&apos;entreprise</Label>
                  <Input id="nom" defaultValue="Vinci Construction" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siren">SIREN</Label>
                  <Input id="siren" defaultValue="552 037 806" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateCreation">Date de création</Label>
                  <Input id="dateCreation" type="date" defaultValue="1899-01-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siege">Adresse du siège social</Label>
                  <Input id="siege" defaultValue="1973 Bd de la Défense, 92000 Nanterre" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Communication et valeurs</CardTitle>
              <CardDescription>Présentez votre entreprise aux futurs candidats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description de l&apos;entreprise</Label>
                <textarea
                  id="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="VINCI Construction est un acteur mondial et un leader européen dans la construction."
                />
              </div>

              <div className="space-y-2">
                <Label>Points forts / Valeurs</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Innovation</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Sécurité</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Environnement</Badge>
                </div>
                <Input placeholder="Ajouter une valeur... (Appuyez sur Entrée)" />
              </div>

              <Button className="bg-[#F48120] hover:bg-[#d9731c]">Enregistrer les informations</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marque" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Identité visuelle</CardTitle>
              <CardDescription>Personnalisez le logo et la bannière visibles sur vos offres.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-4">
                  <Label>Logo de l&apos;entreprise</Label>
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-lg bg-zinc-200 flex items-center justify-center border-2 border-dashed border-zinc-300">
                      <ImageIcon className="h-8 w-8 text-zinc-400" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Importer un logo
                      </Button>
                      <p className="text-xs text-muted-foreground">Format carré recommandé. Max 2Mo.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 w-full">
                  <Label>Bannière entreprise</Label>
                  <div className="h-32 w-full rounded-lg bg-zinc-100 flex items-center justify-center border-2 border-dashed border-zinc-300">
                    <div className="text-center space-y-2">
                      <Upload className="h-8 w-8 text-zinc-400 mx-auto" />
                      <p className="text-sm font-medium text-zinc-600">Glissez-déposez votre bannière ici</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600">Total Postulants</CardTitle>
                <Users className="h-4 w-4 text-[#F48120]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">128</div>
                <p className="text-xs text-muted-foreground mt-1">+14% ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600">Intérimaires en poste</CardTitle>
                <Briefcase className="h-4 w-4 text-[#643494]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">12</div>
                <p className="text-xs text-muted-foreground mt-1">Via RHTT Intérim</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600">Missions pourvues</CardTitle>
                <FileCheck2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">45</div>
                <p className="text-xs text-muted-foreground mt-1">Depuis votre inscription</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Liste des Missions</CardTitle>
              <CardDescription>Gérez vos offres actives et consultez l&apos;historique.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre de la mission</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Candidats</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Chef de chantier (H/F)</TableCell>
                    <TableCell>Pontault-Combault (77)</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-purple-700">Voir les CV</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Grutier expérimenté</TableCell>
                    <TableCell>Paris 15e (75)</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-purple-700">Voir les CV</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Manœuvre BTP</TableCell>
                    <TableCell>Meaux (77)</TableCell>
                    <TableCell>24</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-zinc-100 text-zinc-800">Fermée</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-zinc-500">Archivée</Button>
                    </TableCell>
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
