"use client";
import Link from "next/link";
import { course } from "@/data/mockData";

function PlatformNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold font-[var(--font-playfair)]">
              CB
            </div>
            <span className="text-sm font-[var(--font-playfair)] font-bold gold-text hidden sm:block">
              Casal Baruc
            </span>
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-[var(--gold)] text-sm font-[var(--font-lato)] tracking-wide">
            Plataforma
          </span>
        </div>
        <Link
          href="/"
          className="text-gray-400 hover:text-[var(--gold)] text-sm transition-colors font-[var(--font-lato)]"
        >
          ← Voltar ao Site
        </Link>
      </div>
    </nav>
  );
}

export default function PlataformaPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <PlatformNavbar />

      {/* Hero banner (featured) */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.featuredBanner}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-16 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)] text-black text-xs font-bold font-[var(--font-lato)] mb-4 w-fit">
            🎬 CURSO EM DESTAQUE
          </div>
          <h1 className="text-4xl md:text-6xl font-[var(--font-playfair)] font-black text-white mb-2">
            {course.title}
          </h1>
          <p className="text-[var(--gold-pale)] font-[var(--font-playfair)] italic text-lg mb-4">
            {course.subtitle}
          </p>
          <p className="text-gray-300 text-sm mb-6 max-w-xl font-[var(--font-lato)] leading-relaxed">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/plataforma/curso/${course.id}`}
              className="flex items-center gap-2 px-7 py-3 gold-gradient rounded-full text-black text-sm font-bold font-[var(--font-lato)] hover:opacity-90 transition-opacity btn-pulse"
            >
              ▶ Assistir Agora
            </Link>
            <Link
              href={`/plataforma/curso/${course.id}`}
              className="flex items-center gap-2 px-7 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold font-[var(--font-lato)] hover:bg-white/30 transition"
            >
              ℹ Mais Informações
            </Link>
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="px-8 md:px-16 py-10 space-y-14 max-w-[1600px] mx-auto">
        {/* All modules row */}
        <div>
          <h2 className="text-xl font-[var(--font-playfair)] font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 gold-gradient rounded-full" />
            Módulos do Curso
          </h2>
          <div className="netflix-row pb-4">
            {course.modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/plataforma/curso/${course.id}?modulo=${mod.id}`}
                className="flex-shrink-0 w-52 md:w-64 card-hover rounded-lg overflow-hidden group"
              >
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mod.thumbnail}
                    alt={mod.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                      <span className="text-black text-lg ml-0.5">▶</span>
                    </div>
                  </div>
                  {/* Lesson count badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-[var(--gold)] font-[var(--font-lato)]">
                    {mod.lessons.length} aulas
                  </div>
                </div>
                <div className="p-3 bg-[var(--card)] group-hover:bg-[var(--black-border)] transition-colors">
                  <p className="text-white text-sm font-[var(--font-playfair)] font-semibold leading-snug line-clamp-2">
                    {mod.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 font-[var(--font-lato)]">
                    {mod.description.slice(0, 60)}…
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* First lesson of each module (como "Continue assistindo") */}
        <div>
          <h2 className="text-xl font-[var(--font-playfair)] font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 gold-gradient rounded-full" />
            Aulas em Destaque
          </h2>
          <div className="netflix-row pb-4">
            {course.modules.flatMap((mod) =>
              mod.lessons.slice(0, 2).map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/plataforma/aula/${lesson.id}`}
                  className="flex-shrink-0 w-64 md:w-80 card-hover rounded-lg overflow-hidden group"
                >
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                        <span className="text-black text-lg ml-0.5">▶</span>
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white font-[var(--font-lato)]">
                      {lesson.duration}
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--card)] group-hover:bg-[var(--black-border)] transition-colors">
                    <p className="text-white text-sm font-[var(--font-playfair)] font-semibold line-clamp-2">
                      {lesson.title}
                    </p>
                    <p className="text-[var(--gold)] text-xs mt-1 font-[var(--font-lato)]">
                      {mod.title.split("—")[0].trim()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
