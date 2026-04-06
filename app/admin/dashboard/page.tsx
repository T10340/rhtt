"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Briefcase, Building2, Users, CheckCircle2 } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

const applicationTrendData = [
  { date: "01/05", applications: 12 },
  { date: "05/05", applications: 18 },
  { date: "10/05", applications: 15 },
  { date: "15/05", applications: 25 },
  { date: "20/05", applications: 32 },
  { date: "25/05", applications: 28 },
  { date: "30/05", applications: 40 },
]

const jobDistributionData = [
  { name: "BTP", value: 45, color: "#F48120" },
  { name: "Industrie", value: 25, color: "#643494" },
  { name: "Transport", value: 15, color: "#8b5cf6" },
  { name: "Tertiaire", value: 15, color: "#fb923c" },
]

const recentActivity = [
  {
    id: 1,
    name: "Jean Dupont",
    job: "Chef de chantier",
    date: "Aujourd'hui à 10:30",
    initials: "JD",
  },
  {
    id: 2,
    name: "Marie Martin",
    job: "Assistante administrative",
    date: "Hier à 14:15",
    initials: "MM",
  },
  {
    id: 3,
    name: "Lucas Bernard",
    job: "Chauffeur PL",
    date: "Hier à 09:45",
    initials: "LB",
  },
  {
    id: 4,
    name: "Sophie Petit",
    job: "Ouvrier spécialisé",
    date: "28/05/2024",
    initials: "SP",
  },
  {
    id: 5,
    name: "Thomas Robert",
    job: "Magasinier",
    date: "27/05/2024",
    initials: "TR",
  },
]

const topCompanies = [
  { name: "Vinci Construction", jobs: 12, percentage: 80 },
  { name: "Renault Trucks", jobs: 8, percentage: 60 },
  { name: "Eiffage", jobs: 7, percentage: 55 },
  { name: "Société Générale", jobs: 4, percentage: 35 },
  { name: "SNCF Réseau", jobs: 3, percentage: 25 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Vue d&apos;ensemble</h1>
        <p className="text-muted-foreground">Voici les statistiques clés de votre agence RHTT.</p>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Offres Actives</CardTitle>
            <Briefcase className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">110</div>
            <p className="text-xs text-muted-foreground">+4 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Candidatures (30j)</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">842</div>
            <p className="text-xs text-muted-foreground">+12% vs mois précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Missions en cours</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">180</div>
            <p className="text-xs text-muted-foreground">+15 nouveaux contrats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Top Client</CardTitle>
            <Building2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">Vinci</div>
            <p className="text-xs text-muted-foreground">12 offres en cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-purple-900">Évolution des Candidatures</CardTitle>
            <CardDescription>Nombre de CV reçus sur les 30 derniers jours.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#643494" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#643494" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="applications" stroke="#643494" strokeWidth={2} fillOpacity={1} fill="url(#colorApplications)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-purple-900">Répartition par Secteur</CardTitle>
            <CardDescription>Volume d&apos;offres selon le domaine d&apos;activité.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jobDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Lists */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-900">Entreprises les plus actives</CardTitle>
            <CardDescription>Clients avec le plus grand nombre de recrutements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topCompanies.map((company, i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-9 w-9 bg-orange-100 flex items-center justify-center rounded-full">
                    <Building2 className="h-4 w-4 text-orange-600" />
                  </Avatar>
                  <div className="ml-4 space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{company.name}</p>
                      <p className="text-sm text-muted-foreground">{company.jobs} offres</p>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${company.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-900">Dernières Candidatures</CardTitle>
            <CardDescription>Activité récente des candidats.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-purple-100 text-purple-700">{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Postule pour : {activity.job}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-zinc-500">
                    {activity.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
