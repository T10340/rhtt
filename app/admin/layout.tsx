import { Building, LayoutDashboard, Settings, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 md:flex-row">
      <aside className="w-full border-r bg-white md:w-64">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-purple-900">
            RHTT Admin
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/jobs/create"
            className="flex items-center gap-3 rounded-lg bg-orange-50 px-3 py-2 text-orange-600 transition-colors"
          >
            <Briefcase className="h-5 w-5" />
            Missions
          </Link>
          <Link
            href="/admin/entreprises"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Building className="h-5 w-5" />
            Entreprises
          </Link>
          <Link
            href="/admin/candidats"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Users className="h-5 w-5" />
            Candidats
          </Link>
          <Link
            href="/admin/parametres"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Settings className="h-5 w-5" />
            Paramètres
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
