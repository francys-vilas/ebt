import Link from "next/link";
import GoldButton from "@/components/GoldButton";
import { course } from "@/data/mockData";

export default function CourseTeaserSection() {
  return (
    <section id="curso" className="py-16 md:py-28 px-4 sm:px-6 bg-[var(--surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p className="text-xs font-[var(--font-lato)] tracking-[0.3em] uppercase text-[var(--gold)] mb-4 text-center">
          Plataforma de Cursos
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: info */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)] bg-[var(--gold)]/10 mb-6">
              <span className="text-[var(--gold)] text-xs font-[var(--font-lato)] tracking-widest uppercase font-bold">
                🎬 Novo Curso Online
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-playfair)] font-black text-white leading-tight mb-4">
              {course.title}
            </h2>
            <p className="text-lg md:text-xl text-[var(--gold-pale)] font-[var(--font-playfair)] italic mb-6">
              {course.subtitle}
            </p>
            <div className="h-0.5 w-16 gold-gradient mb-6" />

            <p className="text-gray-400 font-[var(--font-lato)] leading-relaxed mb-8 text-sm md:text-base">
              {course.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-6 mb-8">
              {[
                { icon: "🎓", label: `${course.totalLessons} aulas` },
                { icon: "⏱️", label: `${course.totalHours}h de conteúdo` },
                { icon: "⭐", label: `${course.rating} / 5.0` },
                { icon: "👥", label: `${course.studentsCount.toLocaleString("pt-BR")} alunos` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="text-gray-300 text-xs sm:text-sm font-[var(--font-lato)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Modules preview */}
            <div className="mb-8 space-y-2">
              {course.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 font-[var(--font-lato)]"
                >
                  <div className="w-1.5 h-1.5 rounded-full gold-gradient flex-shrink-0" />
                  {mod.title}
                </div>
              ))}
            </div>

            <GoldButton href="/login" size="lg" pulse>
              🚀 Acessar a Plataforma Agora
            </GoldButton>
          </div>

          {/* Right: mock Netflix-style preview — hidden on small screens */}
          <div className="relative hidden sm:block">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-[var(--gold)]/10">
              {/* Main thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.featuredBanner}
                alt="Preview do curso"
                className="w-full aspect-video object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 gradient-overlay flex flex-col justify-end p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-2 py-1 rounded bg-[var(--gold)] text-black text-xs font-bold font-[var(--font-lato)]">
                    NOVO
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(5)}
                  </div>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-[var(--font-playfair)] font-bold mb-2">
                  {course.title}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 gold-gradient rounded-full text-black text-sm font-bold font-[var(--font-lato)] hover:opacity-90 transition-opacity"
                  >
                    ▶ Assistir Agora
                  </Link>
                  <button className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold font-[var(--font-lato)] hover:bg-white/30 transition">
                    + Minha Lista
                  </button>
                </div>
              </div>
            </div>

            {/* Module thumbnails below */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="relative rounded-lg overflow-hidden aspect-video card-hover cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mod.thumbnail}
                    alt={mod.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg">▶</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
