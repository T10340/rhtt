import Image from 'next/image';
import HeroJobSearch from './HeroJobSearch';

interface FullscreenHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function FullscreenHero({
  title = "L'humain au cœur de vos missions d'avenir",
  subtitle = "BTP, Transport, Logistique et Industrie : accédez à nos opportunités professionnelles sélectionnées avec un accompagnement réactif et sur-mesure.",
  ctaText = "Consulter nos offres",
  ctaHref = "#offres",
}: FullscreenHeroProps) {
  return (
    <section className="relative w-full min-h-[calc(100svh-4.5rem)] md:min-h-[calc(100vh-4.5rem)] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24 overflow-hidden bg-slate-950">
      {/* 1. Image d'arrière-plan en pleine page avec optimisation next/image (Zéro CLS) */}
      <Image
        src="/hero-bg.jpg"
        alt="Équipes RHTT Intérim & Recrutement sur le terrain"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center brightness-[0.82] select-none"
      />

      {/* 2. Voiles dégradés de contraste & identité visuelle RHTT */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/40 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-slate-950/20 to-slate-950/70 pointer-events-none"
      />
      {/* Halo subtil aux couleurs RHTT */}
      <div
        aria-hidden="true"
        className="absolute -top-24 right-1/4 w-96 h-96 bg-rhtt-violet/20 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/4 w-96 h-96 bg-rhtt-orange/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* 3. Contenu au premier plan (Mobile-First & Typographie impactante) */}
      <div className="relative z-10 max-w-4xl xl:max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge de réassurance / contexte */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-slate-200 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-rhtt-orange animate-pulse shrink-0" />
          <span className="tracking-wide">RHTT • Agence d&apos;emploi & Travail temporaire</span>
        </div>

        {/* Titre Principal H1 */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] sm:leading-[1.1] max-w-3xl drop-shadow-md">
          {title}
        </h1>

        {/* Sous-titre / Paragraphe de premier plan */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>

        {/* 4. Module de recherche d'emploi rapide (Métier & Localisation) */}
        <HeroJobSearch className="mt-8 sm:mt-10" />

        {/* Lien secondaire discret vers toutes les offres */}
        <div className="mt-4 flex items-center justify-center">
          <a
            href={ctaHref}
            className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            ou consulter l&apos;intégralité des offres sans filtre ↓
          </a>
        </div>
      </div>

      {/* 4. Indicateur discret de défilement (Desktop) */}
      <a
        href={ctaHref}
        aria-label="Faire défiler vers le contenu"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-white/60 hover:text-white transition-colors animate-bounce hidden md:flex items-center flex-col gap-1 text-[11px] uppercase tracking-widest font-semibold"
      >
        <span>Découvrir</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
