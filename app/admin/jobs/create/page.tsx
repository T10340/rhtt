"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/RichTextEditor"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit comporter au moins 2 caractères.",
  }),
  reference: z.string().min(2, {
    message: "La référence est requise.",
  }),
  sector: z.string().min(1, {
    message: "Veuillez sélectionner un secteur.",
  }),
  location: z.string().min(2, {
    message: "Le lieu est requis.",
  }),
  contractType: z.string().min(1, {
    message: "Veuillez sélectionner un type de contrat.",
  }),
  startDate: z.date({
    invalid_type_error: "Format de date invalide.",
    required_error: "La date de début est requise.",
  } as any),
  duration: z.string().optional(),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  description: z.string().min(10, {
    message: "La description doit comporter au moins 10 caractères.",
  }),
  skills: z.string().min(2, {
    message: "Veuillez indiquer les compétences requises.",
  }),
  experience: z.string().min(1, {
    message: "Veuillez sélectionner un niveau d'expérience.",
  }),
  visibility: z.string().default("draft"),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateJobPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      reference: "",
      location: "",
      duration: "",
      salaryMin: "",
      salaryMax: "",
      description: "",
      skills: "",
      visibility: "draft",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send this to your API
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Créer une offre d&apos;emploi</h1>
          <p className="text-muted-foreground">Remplissez les informations ci-dessous pour publier une nouvelle mission.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={() => form.reset()}>Annuler</Button>
          <Button type="submit" form="job-form" className="bg-orange-500 hover:bg-orange-600">Enregistrer</Button>
        </div>
      </div>

      <Form {...form}>
        <form id="job-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {/* Section A: Informations Principales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Informations Principales</CardTitle>
              <CardDescription>Les détails essentiels de l&apos;offre d&apos;emploi.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Titre du poste *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Chef de chantier BTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Référence interne *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: RHTT-2023-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Secteur d&apos;activité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="btp">BTP</SelectItem>
                        <SelectItem value="tertiaire">Tertiaire</SelectItem>
                        <SelectItem value="industrie">Industrie</SelectItem>
                        <SelectItem value="transport">Transports</SelectItem>
                        <SelectItem value="espaces_verts">Espaces Verts</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Lieu de mission (Ville/CP) *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Pontault-Combault, 77340" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section B: Détails du Contrat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Détails du Contrat</CardTitle>
              <CardDescription>Informations sur la durée et la rémunération.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de contrat *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un contrat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="interim">Intérim</SelectItem>
                        <SelectItem value="cdd">CDD</SelectItem>
                        <SelectItem value="cdi">CDI</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Date de début *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée estimée (si applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 3 mois renouvelables" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salaire Min (€)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ex: 2000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salaire Max (€)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ex: 2500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section C: Description et Profil Requis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Description et Profil</CardTitle>
              <CardDescription>Détaillez les missions et les attentes pour ce poste.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description longue du poste *</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Décrivez les missions, l&apos;environnement de travail et les avantages.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compétences Clés *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Permis CACES, Lecture de plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau d&apos;expérience requis *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un niveau" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Débutant accepté</SelectItem>
                          <SelectItem value="intermediate">1 à 3 ans</SelectItem>
                          <SelectItem value="senior">3 à 5 ans</SelectItem>
                          <SelectItem value="expert">Plus de 5 ans</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section D: Publication */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Paramètres de Publication</CardTitle>
              <CardDescription>Gérez la visibilité de cette offre sur le site.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="max-w-md">
                    <FormLabel>Statut de visibilité</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="published">Publiée en ligne</SelectItem>
                        <SelectItem value="draft">Brouillon (Interne)</SelectItem>
                        <SelectItem value="archived">Archivée</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

        </form>
      </Form>
    </div>
  )
}
