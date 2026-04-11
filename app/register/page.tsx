import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <Link href="/" className="mx-auto flex w-fit items-center gap-2 text-2xl font-bold tracking-tight text-purple-900 mb-4">
            <span className="text-[#F48120]">RHTT</span> Intérim
          </Link>
          <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
          <CardDescription>
            Rejoignez-nous pour trouver votre prochaine mission ou vos futurs talents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="candidat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="candidat">Candidat</TabsTrigger>
              <TabsTrigger value="entreprise">Entreprise</TabsTrigger>
            </TabsList>

            <TabsContent value="candidat">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-cand">Email</Label>
                  <Input id="email-cand" type="email" placeholder="m.dupont@exemple.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-cand">Mot de passe</Label>
                  <Input id="password-cand" type="password" required />
                </div>
                <Button type="submit" className="w-full bg-[#643494] hover:bg-[#522b7a]">
                  S&apos;inscrire comme candidat
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="entreprise">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l&apos;entreprise</Label>
                  <Input id="companyName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-ent">Email professionnel</Label>
                  <Input id="email-ent" type="email" placeholder="contact@entreprise.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-ent">Mot de passe</Label>
                  <Input id="password-ent" type="password" required />
                </div>
                <Button type="submit" className="w-full bg-[#F48120] hover:bg-[#d9731c]">
                  Créer un compte entreprise
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Ou</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* TODO: Implement OAuth providers later */}
            <Button variant="outline" className="w-full relative">
              <svg className="absolute left-4 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path><path d="m11 16 5-4-5-4v8z"></path></svg>
              S&apos;inscrire avec Google
            </Button>
            <Button variant="outline" className="w-full relative">
              <svg className="absolute left-4 h-4 w-4 text-[#0A66C2]" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              S&apos;inscrire avec LinkedIn
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-6">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-purple-900 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
