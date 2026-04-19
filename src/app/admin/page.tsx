"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ── Types ── */
type Lesson = { id: string; module_id: string; title: string; description: string; video_id: string; duration: string; order_index: number };
type Module = { id: string; title: string; description: string; thumbnail: string; order_index: number; lessons?: Lesson[] };
type Event  = { id: string; title: string; venue: string; city: string; state: string; day: string; month: string; available_spots: number; description: string; whatsapp_link: string };

/* ── Blank defaults ── */
const blankModule  = (): Omit<Module, "id"> => ({ title: "", description: "", thumbnail: "", order_index: 0 });
const blankLesson  = (module_id: string): Omit<Lesson, "id"> => ({ module_id, title: "", description: "", video_id: "", duration: "00:00", order_index: 0 });
const blankEvent   = (): Omit<Event,  "id"> => ({ title: "", venue: "", city: "", state: "", day: "", month: "", available_spots: 0, description: "", whatsapp_link: "" });

/* ── Input helper ── */
function Field({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  const cls = "w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm font-[var(--font-lato)] outline-none focus:border-[var(--gold)] transition-colors";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-[var(--font-lato)]">{label}</label>
      {textarea
        ? <textarea rows={2} className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        : <input className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  );
}

/* ── Preview: Lesson card ── */
function LessonPreview({ lesson }: { lesson: Partial<Lesson> }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)] flex gap-3 p-2">
      {lesson.video_id ? (
        <img src={`https://img.youtube.com/vi/${lesson.video_id}/mqdefault.jpg`} alt="" className="w-24 aspect-video object-cover rounded" />
      ) : (
        <div className="w-24 aspect-video bg-[var(--border)] rounded flex items-center justify-center text-gray-600 text-xs">sem vídeo</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-[var(--font-playfair)] font-semibold line-clamp-1">{lesson.title || "Título da aula"}</p>
        <p className="text-gray-500 text-xs mt-0.5">{lesson.duration || "00:00"}</p>
      </div>
    </div>
  );
}

/* ── Preview: Event card ── */
function EventPreview({ event }: { event: Partial<Event> }) {
  return (
    <div className="flex gap-4 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)]">
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg gold-gradient text-black">
        <span className="text-[10px] font-bold">{event.month || "MÊS"}</span>
        <span className="text-xl font-black leading-none font-[var(--font-playfair)]">{event.day || "00"}</span>
      </div>
      <div>
        <p className="text-white text-sm font-[var(--font-playfair)] font-bold line-clamp-1">{event.title || "Nome do Evento"}</p>
        <p className="text-[var(--gold)] text-xs mt-0.5">📍 {event.venue || "Local"} — {event.city || "Cidade"}/{event.state || "UF"}</p>
        <p className="text-gray-500 text-xs mt-0.5">{event.available_spots || 0} vagas</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [tab, setTab] = useState<"curso" | "agenda">("curso");

  /* ── Course state ── */
  const [modules, setModules]             = useState<Module[]>([]);
  const [expandedMod, setExpandedMod]     = useState<string | null>(null);
  const [editingMod, setEditingMod]       = useState<Partial<Module> | null>(null);
  const [editingLesson, setEditingLesson] = useState<Partial<Lesson> | null>(null);
  const [previewLesson, setPreviewLesson] = useState<Partial<Lesson>>({});

  /* ── Agenda state ── */
  const [events, setEvents]           = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [previewEvent, setPreviewEvent] = useState<Partial<Event>>({});

  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState("");

  /* ── Load data ── */
  useEffect(() => { loadModules(); loadEvents(); }, []);

  async function loadModules() {
    const { data: mods } = await supabase.from("modules").select("*").order("order_index");
    if (!mods) return;
    const withLessons = await Promise.all(mods.map(async (m) => {
      const { data: lessons } = await supabase.from("lessons").select("*").eq("module_id", m.id).order("order_index");
      return { ...m, lessons: lessons ?? [] };
    }));
    setModules(withLessons);
  }

  async function loadEvents() {
    const { data } = await supabase.from("events").select("*").order("event_date");
    setEvents(data ?? []);
  }

  function flash(text: string) { setMsg(text); setTimeout(() => setMsg(""), 2500); }

  /* ── Module CRUD ── */
  async function saveModule() {
    setSaving(true);
    if (editingMod?.id) {
      await supabase.from("modules").update({ title: editingMod.title, description: editingMod.description, thumbnail: editingMod.thumbnail, order_index: editingMod.order_index }).eq("id", editingMod.id);
    } else {
      await supabase.from("modules").insert(editingMod);
    }
    setSaving(false); setEditingMod(null); loadModules(); flash("Módulo salvo!");
  }

  async function deleteModule(id: string) {
    if (!confirm("Deletar módulo e todas as aulas?")) return;
    await supabase.from("modules").delete().eq("id", id);
    loadModules(); flash("Módulo deletado.");
  }

  /* ── Lesson CRUD ── */
  async function saveLesson() {
    setSaving(true);
    if (editingLesson?.id) {
      await supabase.from("lessons").update({ title: editingLesson.title, description: editingLesson.description, video_id: editingLesson.video_id, duration: editingLesson.duration, order_index: editingLesson.order_index }).eq("id", editingLesson.id);
    } else {
      await supabase.from("lessons").insert(editingLesson);
    }
    setSaving(false); setEditingLesson(null); loadModules(); flash("Aula salva!");
  }

  async function deleteLesson(id: string) {
    if (!confirm("Deletar esta aula?")) return;
    await supabase.from("lessons").delete().eq("id", id);
    loadModules(); flash("Aula deletada.");
  }

  /* ── Event CRUD ── */
  async function saveEvent() {
    setSaving(true);
    if (editingEvent?.id) {
      const { id, ...rest } = editingEvent as Event;
      await supabase.from("events").update(rest).eq("id", id);
    } else {
      await supabase.from("events").insert(editingEvent);
    }
    setSaving(false); setEditingEvent(null); loadEvents(); flash("Evento salvo!");
  }

  async function deleteEvent(id: string) {
    if (!confirm("Deletar este evento?")) return;
    await supabase.from("events").delete().eq("id", id);
    loadEvents(); flash("Evento deletado.");
  }

  /* ══ Render ══ */
  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-[var(--border)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold font-[var(--font-playfair)]">CB</div>
          <span className="font-[var(--font-playfair)] font-bold gold-text">Admin</span>
        </div>
        <div className="flex gap-2">
          {(["curso", "agenda"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-[var(--font-lato)] uppercase tracking-wider transition-all ${tab === t ? "gold-gradient text-black" : "text-gray-400 hover:text-white border border-[var(--border)]"}`}>
              {t === "curso" ? "🎬 Curso" : "📅 Agenda"}
            </button>
          ))}
        </div>
        <a href="/plataforma" className="text-xs text-gray-500 hover:text-[var(--gold)] font-[var(--font-lato)] transition-colors">← Plataforma</a>
      </header>

      {/* Flash */}
      {msg && <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[var(--gold)] text-black text-sm font-bold rounded-full shadow-lg">{msg}</div>}

      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1fr_320px] gap-8">

        {/* ═══ LEFT: main content ═══ */}
        <div>

          {/* ─── CURSO TAB ─── */}
          {tab === "curso" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-[var(--font-playfair)] font-bold">Módulos do Curso</h1>
                <button onClick={() => setEditingMod(blankModule())}
                  className="px-4 py-2 gold-gradient rounded-full text-black text-xs font-bold">
                  + Novo Módulo
                </button>
              </div>

              {/* Module form */}
              {editingMod && (
                <div className="mb-6 p-5 rounded-2xl border border-[var(--gold)]/40 bg-[var(--surface)] space-y-3">
                  <h2 className="text-sm font-bold text-[var(--gold)] font-[var(--font-lato)] uppercase tracking-widest">
                    {editingMod.id ? "Editar Módulo" : "Novo Módulo"}
                  </h2>
                  <Field label="Título" value={editingMod.title ?? ""} onChange={v => setEditingMod(p => ({ ...p!, title: v }))} placeholder="Ex: Módulo 1 — Fundamentos" />
                  <Field label="Descrição" value={editingMod.description ?? ""} onChange={v => setEditingMod(p => ({ ...p!, description: v }))} textarea />
                  <Field label="URL da Thumbnail" value={editingMod.thumbnail ?? ""} onChange={v => setEditingMod(p => ({ ...p!, thumbnail: v }))} placeholder="https://..." />
                  <Field label="Ordem" value={String(editingMod.order_index ?? 0)} onChange={v => setEditingMod(p => ({ ...p!, order_index: Number(v) }))} />
                  <div className="flex gap-2 pt-1">
                    <button onClick={saveModule} disabled={saving} className="px-4 py-2 gold-gradient rounded-full text-black text-xs font-bold disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
                    <button onClick={() => setEditingMod(null)} className="px-4 py-2 border border-[var(--border)] rounded-full text-gray-400 text-xs">Cancelar</button>
                  </div>
                </div>
              )}

              {/* Module list */}
              <div className="space-y-4">
                {modules.length === 0 && <p className="text-gray-500 text-sm font-[var(--font-lato)]">Nenhum módulo cadastrado ainda.</p>}
                {modules.map(mod => (
                  <div key={mod.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    {/* Module header */}
                    <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedMod(expandedMod === mod.id ? null : mod.id)}>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--gold)] font-bold font-[var(--font-playfair)]">#{mod.order_index + 1}</span>
                        <div>
                          <p className="text-white font-[var(--font-playfair)] font-semibold">{mod.title}</p>
                          <p className="text-gray-500 text-xs font-[var(--font-lato)]">{mod.lessons?.length ?? 0} aulas</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={e => { e.stopPropagation(); setEditingMod(mod); }} className="px-3 py-1 text-xs border border-[var(--border)] rounded-full text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">Editar</button>
                        <button onClick={e => { e.stopPropagation(); deleteModule(mod.id); }} className="px-3 py-1 text-xs border border-red-900 rounded-full text-red-500 hover:bg-red-500/10 transition-colors">Deletar</button>
                        <span className="text-gray-600 text-sm">{expandedMod === mod.id ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {/* Lessons */}
                    {expandedMod === mod.id && (
                      <div className="px-5 pb-4 border-t border-[var(--border)]">
                        <div className="flex items-center justify-between py-3">
                          <span className="text-xs uppercase tracking-widest text-gray-500 font-[var(--font-lato)]">Aulas</span>
                          <button onClick={() => { setEditingLesson(blankLesson(mod.id)); setPreviewLesson({}); }}
                            className="px-3 py-1 text-xs gold-gradient rounded-full text-black font-bold">+ Aula</button>
                        </div>

                        {/* Lesson form */}
                        {editingLesson && editingLesson.module_id === mod.id && (
                          <div className="mb-4 p-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--card)] space-y-3">
                            <h3 className="text-xs font-bold text-[var(--gold)] uppercase tracking-widest">{editingLesson.id ? "Editar Aula" : "Nova Aula"}</h3>
                            <Field label="Título" value={editingLesson.title ?? ""} onChange={v => { const u = { ...editingLesson, title: v }; setEditingLesson(u); setPreviewLesson(u); }} placeholder="Título da aula" />
                            <Field label="YouTube Video ID" value={editingLesson.video_id ?? ""} onChange={v => { const u = { ...editingLesson, video_id: v }; setEditingLesson(u); setPreviewLesson(u); }} placeholder="Ex: dQw4w9WgXcQ" />
                            <Field label="Duração" value={editingLesson.duration ?? ""} onChange={v => { const u = { ...editingLesson, duration: v }; setEditingLesson(u); setPreviewLesson(u); }} placeholder="Ex: 12:30" />
                            <Field label="Descrição" value={editingLesson.description ?? ""} onChange={v => setEditingLesson(p => ({ ...p!, description: v }))} textarea />
                            <Field label="Ordem" value={String(editingLesson.order_index ?? 0)} onChange={v => setEditingLesson(p => ({ ...p!, order_index: Number(v) }))} />
                            <div className="flex gap-2 pt-1">
                              <button onClick={saveLesson} disabled={saving} className="px-4 py-2 gold-gradient rounded-full text-black text-xs font-bold disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
                              <button onClick={() => { setEditingLesson(null); setPreviewLesson({}); }} className="px-4 py-2 border border-[var(--border)] rounded-full text-gray-400 text-xs">Cancelar</button>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          {mod.lessons?.length === 0 && <p className="text-gray-600 text-xs py-2">Nenhuma aula ainda.</p>}
                          {mod.lessons?.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                              <div className="flex items-center gap-2 min-w-0">
                                {lesson.video_id && <img src={`https://img.youtube.com/vi/${lesson.video_id}/default.jpg`} alt="" className="w-14 aspect-video object-cover rounded" />}
                                <div className="min-w-0">
                                  <p className="text-sm text-white font-[var(--font-lato)] truncate">{lesson.title}</p>
                                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <button onClick={() => { setEditingLesson(lesson); setPreviewLesson(lesson); }} className="px-2 py-1 text-xs border border-[var(--border)] rounded-full text-gray-400 hover:text-[var(--gold)]">Editar</button>
                                <button onClick={() => deleteLesson(lesson.id)} className="px-2 py-1 text-xs border border-red-900 rounded-full text-red-500">Del</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── AGENDA TAB ─── */}
          {tab === "agenda" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-[var(--font-playfair)] font-bold">Agenda de Eventos</h1>
                <button onClick={() => { setEditingEvent(blankEvent()); setPreviewEvent({}); }}
                  className="px-4 py-2 gold-gradient rounded-full text-black text-xs font-bold">
                  + Novo Evento
                </button>
              </div>

              {/* Event form */}
              {editingEvent && (
                <div className="mb-6 p-5 rounded-2xl border border-[var(--gold)]/40 bg-[var(--surface)] space-y-3">
                  <h2 className="text-sm font-bold text-[var(--gold)] font-[var(--font-lato)] uppercase tracking-widest">
                    {editingEvent.id ? "Editar Evento" : "Novo Evento"}
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Título" value={editingEvent.title ?? ""} onChange={v => { const u = { ...editingEvent, title: v }; setEditingEvent(u); setPreviewEvent(u); }} placeholder="Nome do evento" />
                    <Field label="Local (venue)" value={editingEvent.venue ?? ""} onChange={v => { const u = { ...editingEvent, venue: v }; setEditingEvent(u); setPreviewEvent(u); }} placeholder="Teatro, Igreja..." />
                    <Field label="Cidade" value={editingEvent.city ?? ""} onChange={v => { const u = { ...editingEvent, city: v }; setEditingEvent(u); setPreviewEvent(u); }} />
                    <Field label="Estado (UF)" value={editingEvent.state ?? ""} onChange={v => { const u = { ...editingEvent, state: v }; setEditingEvent(u); setPreviewEvent(u); }} placeholder="SP" />
                    <Field label="Dia" value={editingEvent.day ?? ""} onChange={v => { const u = { ...editingEvent, day: v }; setEditingEvent(u); setPreviewEvent(u); }} placeholder="15" />
                    <Field label="Mês (abrev)" value={editingEvent.month ?? ""} onChange={v => { const u = { ...editingEvent, month: v }; setEditingEvent(u); setPreviewEvent(u); }} placeholder="JUN" />
                    <Field label="Vagas disponíveis" value={String(editingEvent.available_spots ?? 0)} onChange={v => { const u = { ...editingEvent, available_spots: Number(v) }; setEditingEvent(u); setPreviewEvent(u); }} />
                    <Field label="Link WhatsApp" value={editingEvent.whatsapp_link ?? ""} onChange={v => setEditingEvent(p => ({ ...p!, whatsapp_link: v }))} placeholder="https://wa.me/..." />
                  </div>
                  <Field label="Descrição" value={editingEvent.description ?? ""} onChange={v => setEditingEvent(p => ({ ...p!, description: v }))} textarea />
                  <div className="flex gap-2 pt-1">
                    <button onClick={saveEvent} disabled={saving} className="px-4 py-2 gold-gradient rounded-full text-black text-xs font-bold disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
                    <button onClick={() => { setEditingEvent(null); setPreviewEvent({}); }} className="px-4 py-2 border border-[var(--border)] rounded-full text-gray-400 text-xs">Cancelar</button>
                  </div>
                </div>
              )}

              {/* Event list */}
              <div className="space-y-3">
                {events.length === 0 && <p className="text-gray-500 text-sm font-[var(--font-lato)]">Nenhum evento cadastrado ainda.</p>}
                {events.map(ev => (
                  <div key={ev.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/40 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg gold-gradient text-black">
                        <span className="text-[9px] font-bold">{ev.month}</span>
                        <span className="text-lg font-black leading-none font-[var(--font-playfair)]">{ev.day}</span>
                      </div>
                      <div>
                        <p className="text-white font-[var(--font-playfair)] font-semibold">{ev.title}</p>
                        <p className="text-[var(--gold)] text-xs font-[var(--font-lato)]">📍 {ev.venue} — {ev.city}/{ev.state}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => { setEditingEvent(ev); setPreviewEvent(ev); }} className="px-3 py-1 text-xs border border-[var(--border)] rounded-full text-gray-400 hover:text-[var(--gold)]">Editar</button>
                      <button onClick={() => deleteEvent(ev.id)} className="px-3 py-1 text-xs border border-red-900 rounded-full text-red-500">Deletar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT: Preview ═══ */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              <span className="text-xs font-bold text-gray-400 font-[var(--font-lato)] uppercase tracking-widest">Prévia</span>
            </div>
            <div className="p-4">
              {tab === "curso" && (
                <div className="space-y-2">
                  {Object.keys(previewLesson).length > 0
                    ? <LessonPreview lesson={previewLesson} />
                    : <p className="text-gray-600 text-xs text-center py-8 font-[var(--font-lato)]">Edite ou crie uma aula para ver a prévia</p>
                  }
                </div>
              )}
              {tab === "agenda" && (
                <div>
                  {Object.keys(previewEvent).length > 0
                    ? <EventPreview event={previewEvent} />
                    : <p className="text-gray-600 text-xs text-center py-8 font-[var(--font-lato)]">Edite ou crie um evento para ver a prévia</p>
                  }
                </div>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-3 text-center">
              <p className="text-2xl font-bold gold-text font-[var(--font-playfair)]">{modules.length}</p>
              <p className="text-xs text-gray-500 font-[var(--font-lato)]">Módulos</p>
            </div>
            <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-3 text-center">
              <p className="text-2xl font-bold gold-text font-[var(--font-playfair)]">{modules.reduce((a, m) => a + (m.lessons?.length ?? 0), 0)}</p>
              <p className="text-xs text-gray-500 font-[var(--font-lato)]">Aulas</p>
            </div>
            <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-3 text-center col-span-2">
              <p className="text-2xl font-bold gold-text font-[var(--font-playfair)]">{events.length}</p>
              <p className="text-xs text-gray-500 font-[var(--font-lato)]">Eventos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
