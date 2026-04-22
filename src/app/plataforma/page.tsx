"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { course } from "@/data/mockData";

function PlatformNavbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setEmail(data.user.email ?? null);
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();
        if (profile) {
          setRole(profile.role);
        }
      }
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const initials = email
    ? email.split("@")[0].slice(0, 2).toUpperCase()
    : "??";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-[var(--border)]">
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

        {/* User avatar + dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 group"
            aria-label="Menu do usuário"
          >
            {email && (
              <span className="text-gray-400 text-xs font-[var(--font-lato)] hidden sm:block max-w-[180px] truncate">
                {email}
              </span>
            )}
            <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold font-[var(--font-playfair)] ring-2 ring-transparent group-hover:ring-[var(--gold)] transition-all duration-300">
              {initials}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl border border-[var(--border)] shadow-xl overflow-hidden"
              style={{ backgroundColor: "var(--surface)" }}>
              {/* User info */}
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <p className="text-xs text-gray-500 font-[var(--font-lato)]">Logado como</p>
                <p className="text-sm text-white font-[var(--font-lato)] truncate mt-0.5">{email}</p>
              </div>
              {/* Actions */}
              <div className="p-2 flex flex-col gap-1">
                {role === "admin" && (
                  <Link
                    href="/admin"
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[var(--gold)] hover:bg-[var(--gold)]/10 font-[var(--font-lato)] transition-colors flex items-center gap-2"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    Painel Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 font-[var(--font-lato)] transition-colors flex items-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair da conta
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}

type DbLesson = { id: string; module_id: string; title: string; description: string; video_id: string; duration: string; order_index: number };
type DbModule = { id: string; title: string; description: string; thumbnail: string; order_index: number; lessons: DbLesson[] };

export default function PlataformaPage() {
  const [modules, setModules] = useState<DbModule[]>([]);
  const [loading, setLoading]  = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function load() {
      const { data: mods } = await supabase.from("modules").select("*").order("order_index");
      if (!mods || mods.length === 0) { setLoading(false); return; }
      const withLessons = await Promise.all(mods.map(async (m) => {
        const { data: lessons } = await supabase.from("lessons").select("*").eq("module_id", m.id).order("order_index");
        return { ...m, lessons: lessons ?? [] };
      }));
      setModules(withLessons);
      setLoading(false);
    }
    load();
  }, []);

  // All lessons flat for "Aulas em Destaque"
  const featuredLessons = modules.flatMap(m => m.lessons.slice(0, 2).map(l => ({ ...l, moduleName: m.title })));

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <PlatformNavbar />

      {/* Hero banner (featured) */}
      <div className="relative h-[70vh] w-full overflow-hidden mt-[57px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.featuredBanner}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/70 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)] text-black text-xs font-bold font-[var(--font-lato)] mb-4 w-fit">
            🎬 CURSO EM DESTAQUE
          </div>
          <h1 className="text-4xl md:text-6xl font-[var(--font-playfair)] font-black text-white mb-3">
            {course.title}
          </h1>
          <p className="text-[var(--gold-pale)] font-[var(--font-playfair)] italic text-lg mb-5">
            {course.subtitle}
          </p>
          <p className="text-gray-300 text-sm mb-8 max-w-xl font-[var(--font-lato)] leading-relaxed">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/plataforma/curso/${course.id}`}
              className="flex items-center gap-2 px-7 py-3 gold-gradient rounded-full text-black text-sm font-bold font-[var(--font-lato)] hover:opacity-90 transition-opacity btn-pulse">
              ▶ Assistir Agora
            </Link>
            <Link href={`/plataforma/curso/${course.id}`}
              className="flex items-center gap-2 px-7 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold font-[var(--font-lato)] hover:bg-white/30 transition">
              ℹ Mais Informações
            </Link>
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="px-8 md:px-16 py-16 space-y-20 max-w-[1600px] mx-auto">

        {/* Modules row */}
        {!loading && modules.length > 0 && (
          <div>
            <h2 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-6 gold-gradient rounded-full" />
              Módulos do Curso
            </h2>
            <div className="netflix-row pb-4">
              {modules.map((mod) => (
                <Link key={mod.id} href={`/plataforma/curso/${mod.id}`}
                  className="flex-shrink-0 w-52 md:w-64 card-hover rounded-lg overflow-hidden group">
                  <div className="relative aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mod.thumbnail || course.featuredBanner} alt={mod.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                        <span className="text-black text-lg ml-0.5">▶</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-[var(--gold)] font-[var(--font-lato)]">
                      {mod.lessons.length} aulas
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--card)] group-hover:bg-[var(--black-border)] transition-colors">
                    <p className="text-white text-sm font-[var(--font-playfair)] font-semibold leading-snug line-clamp-2">{mod.title}</p>
                    <p className="text-gray-500 text-xs mt-1 font-[var(--font-lato)]">{mod.description?.slice(0, 60)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured lessons */}
        {!loading && featuredLessons.length > 0 && (
          <div>
            <h2 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-6 gold-gradient rounded-full" />
              Aulas em Destaque
            </h2>
            <div className="netflix-row pb-4">
              {featuredLessons.map((lesson) => (
                <Link key={lesson.id} href={`/plataforma/aula/${lesson.id}`}
                  className="flex-shrink-0 w-64 md:w-80 card-hover rounded-lg overflow-hidden group">
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${lesson.video_id}/mqdefault.jpg`} alt={lesson.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                        <span className="text-black text-lg ml-0.5">▶</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white font-[var(--font-lato)]">
                      {lesson.duration}
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--card)] group-hover:bg-[var(--black-border)] transition-colors">
                    <p className="text-white text-sm font-[var(--font-playfair)] font-semibold line-clamp-2">{lesson.title}</p>
                    <p className="text-[var(--gold)] text-xs mt-1 font-[var(--font-lato)]">{lesson.moduleName?.split("—")[0].trim()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && modules.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-[var(--font-lato)]">O curso ainda está sendo preparado.</p>
            <p className="text-gray-600 text-sm mt-2 font-[var(--font-lato)]">Em breve novos módulos estarão disponíveis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
