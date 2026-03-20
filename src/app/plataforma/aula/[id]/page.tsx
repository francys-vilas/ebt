import Link from "next/link";
import { course } from "@/data/mockData";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;

  // Find lesson across modules
  let foundLesson = null;
  let foundModule = null;
  let nextLesson = null;

  for (let mi = 0; mi < course.modules.length; mi++) {
    const mod = course.modules[mi];
    for (let li = 0; li < mod.lessons.length; li++) {
      if (mod.lessons[li].id === id) {
        foundLesson = mod.lessons[li];
        foundModule = mod;
        // Try to get next lesson
        if (li + 1 < mod.lessons.length) {
          nextLesson = mod.lessons[li + 1];
        } else if (mi + 1 < course.modules.length) {
          nextLesson = course.modules[mi + 1].lessons[0];
        }
        break;
      }
    }
    if (foundLesson) break;
  }

  if (!foundLesson || !foundModule) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <div className="bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] px-6 py-3 flex items-center justify-between">
        <Link href="/plataforma" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold">
            CB
          </div>
          <span className="text-sm font-[var(--font-playfair)] gold-text hidden sm:block">
            Casal Baruc
          </span>
        </Link>
        <span className="text-gray-400 text-sm font-[var(--font-lato)] text-center truncate max-w-xs">
          {foundLesson.title}
        </span>
        <Link
          href={`/plataforma/curso/${course.id}`}
          className="text-gray-400 hover:text-[var(--gold)] text-sm transition-colors font-[var(--font-lato)]"
        >
          Conteúdo
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Video player */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-[var(--gold)]/10 mb-8" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://www.youtube.com/embed/${foundLesson.videoId}?rel=0&modestbranding=1&color=white`}
            title={foundLesson.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Lesson info */}
        <div className="flex flex-col md:flex-row gap-8 md:items-start">
          <div className="flex-1">
            {/* Breadcrumb */}
            <p className="text-[var(--gold)] text-xs font-[var(--font-lato)] tracking-wider uppercase mb-2">
              {foundModule.title.split("—")[0].trim()}
            </p>
            <h1 className="text-2xl md:text-3xl font-[var(--font-playfair)] font-bold text-white mb-3">
              {foundLesson.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-400 text-sm font-[var(--font-lato)]">
                ⏱ {foundLesson.duration}
              </span>
              <div className="h-3 w-px bg-[var(--border)]" />
              <span className="text-gray-400 text-sm font-[var(--font-lato)]">
                {course.title}
              </span>
            </div>
            <div className="h-px w-full bg-[var(--border)] mb-4" />
            <p className="text-gray-400 font-[var(--font-lato)] leading-relaxed">
              {foundLesson.description}
            </p>
          </div>

          {/* Sidebar: next lesson */}
          {nextLesson && (
            <div className="md:w-72 flex-shrink-0">
              <p className="text-[var(--gold)] text-xs font-[var(--font-lato)] tracking-wider uppercase mb-3">
                Próxima Aula
              </p>
              <Link
                href={`/plataforma/aula/${nextLesson.id}`}
                className="block rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)] transition-all group"
              >
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${nextLesson.videoId}/mqdefault.jpg`}
                    alt={nextLesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                      <span className="text-black text-sm ml-0.5">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[var(--card)]">
                  <p className="text-white text-sm font-[var(--font-playfair)] font-semibold leading-snug">
                    {nextLesson.title}
                  </p>
                  <p className="text-[var(--gold)] text-xs mt-1 font-[var(--font-lato)]">
                    {nextLesson.duration}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* All lessons from this module */}
        <div className="mt-12">
          <h2 className="text-xl font-[var(--font-playfair)] font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-6 gold-gradient rounded-full" />
            Mais aulas: {foundModule.title.split("—")[1]?.trim() ?? foundModule.title}
          </h2>
          <div className="space-y-2">
            {foundModule.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={`/plataforma/aula/${lesson.id}`}
                className={`flex items-center gap-4 px-5 py-3 rounded-xl border transition-all group ${
                  lesson.id === id
                    ? "border-[var(--gold)] bg-[var(--gold)]/5"
                    : "border-[var(--border)] hover:border-[var(--gold)]/50 hover:bg-[var(--card)]"
                }`}
              >
                <span className={`text-sm w-5 text-center font-[var(--font-lato)] ${lesson.id === id ? "text-[var(--gold)]" : "text-gray-600"}`}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-[var(--font-lato)] ${lesson.id === id ? "text-[var(--gold-pale)]" : "text-white"}`}>
                    {lesson.title}
                  </p>
                </div>
                <span className="text-gray-500 text-xs font-[var(--font-lato)]">
                  {lesson.duration}
                </span>
                {lesson.id === id && (
                  <span className="text-[var(--gold)] text-xs">▶ Atual</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
