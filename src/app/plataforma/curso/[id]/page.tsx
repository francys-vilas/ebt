"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { course } from "@/data/mockData";
import GoldButton from "@/components/GoldButton";

type Lesson = { id: string; module_id: string; title: string; description: string; video_id: string; duration: string; order_index: number };
type Module = { id: string; title: string; description: string; thumbnail: string; order_index: number; lessons: Lesson[] };

export default function CourseDetailPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

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

  const firstLesson = modules[0]?.lessons[0];
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-16">
      {/* Back nav */}
      <div className="px-8 md:px-16 pt-8 pb-4">
        <Link href="/plataforma" className="text-gray-400 hover:text-[var(--gold)] text-sm transition-colors font-[var(--font-lato)] flex items-center gap-2">
          ← Voltar à Plataforma
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden mx-8 md:mx-16 rounded-2xl mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.featuredBanner} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-black text-white mb-2">{course.title}</h1>
          <p className="text-[var(--gold-pale)] font-[var(--font-playfair)] italic mb-4">{course.subtitle}</p>
          {firstLesson && (
            <GoldButton href={`/plataforma/aula/${firstLesson.id}`} size="md" pulse>
              ▶ Começar Agora
            </GoldButton>
          )}
        </div>
      </div>

      {/* Meta info */}
      <div className="px-8 md:px-16 mb-10">
        <div className="flex flex-wrap gap-6 text-sm text-gray-300 font-[var(--font-lato)] mb-4">
          <span className="text-[var(--gold)]">★ {course.rating}</span>
          <span>{course.studentsCount.toLocaleString("pt-BR")} alunos</span>
          {!loading && <span>{totalLessons} aulas</span>}
          {!loading && <span>{modules.length} módulos</span>}
        </div>
        <p className="text-gray-400 max-w-3xl leading-relaxed font-[var(--font-lato)]">{course.description}</p>
      </div>

      {/* Modules & Lessons */}
      <div className="px-8 md:px-16 pb-20 space-y-6 max-w-4xl">
        <h2 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-1 h-6 gold-gradient rounded-full" />
          Conteúdo do Curso
        </h2>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] h-20 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && modules.length === 0 && (
          <p className="text-gray-500 font-[var(--font-lato)] text-sm">Nenhum módulo disponível ainda.</p>
        )}

        {modules.map((mod, modIdx) => (
          <div key={mod.id} className="rounded-xl border border-[var(--border)] overflow-hidden">
            {/* Module header */}
            <div className="bg-[var(--card)] px-6 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold font-[var(--font-lato)] flex-shrink-0">
                {modIdx + 1}
              </div>
              <div>
                <h3 className="text-white font-[var(--font-playfair)] font-bold">{mod.title}</h3>
                <p className="text-gray-400 text-xs font-[var(--font-lato)] mt-0.5">
                  {mod.lessons.length} aulas • {mod.description}
                </p>
              </div>
            </div>

            {/* Lessons list */}
            <div className="divide-y divide-[var(--border)]">
              {mod.lessons.map((lesson, lessonIdx) => (
                <Link key={lesson.id} href={`/plataforma/aula/${lesson.id}`}
                  className="flex items-center gap-4 px-6 py-4 bg-[var(--surface)] hover:bg-[var(--card)] group transition-colors">
                  <span className="text-gray-600 text-sm w-6 text-center font-[var(--font-lato)] group-hover:text-[var(--gold)] transition-colors">
                    {lessonIdx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/10 transition-all flex-shrink-0">
                    <span className="text-gray-500 group-hover:text-[var(--gold)] text-xs ml-0.5 transition-colors">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-[var(--font-lato)] group-hover:text-[var(--gold-pale)] transition-colors truncate">
                      {lesson.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5 font-[var(--font-lato)]">
                      {lesson.description?.slice(0, 70)}{lesson.description?.length > 70 ? "…" : ""}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs font-[var(--font-lato)] flex-shrink-0">{lesson.duration}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
