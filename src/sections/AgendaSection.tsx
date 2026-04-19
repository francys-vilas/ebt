"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import SectionTitle from "@/components/SectionTitle";
import GoldButton from "@/components/GoldButton";
import { events as mockEvents } from "@/data/mockData";

type Event = {
  id: string; title: string; venue: string; city: string; state: string;
  day: string; month: string; available_spots: number; description: string; whatsapp_link: string;
};

export default function AgendaSection() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.from("events").select("*").order("event_date").then(({ data }) => {
      if (data && data.length > 0) setEvents(data);
      else setEvents(mockEvents.map(e => ({ ...e, available_spots: e.availableSpots, whatsapp_link: e.whatsappLink })));
    });
  }, []);

  return (
    <section id="agenda" className="py-16 md:py-28 px-4 sm:px-6 bg-[var(--bg)] relative">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(201,168,76,0.3) 20px,rgba(201,168,76,0.3) 21px)` }} />

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          label="Próximos Eventos"
          title="Nossa Agenda"
          subtitle="Encontre o evento mais próximo de você e venha viver uma experiência que vai transformar o seu relacionamento."
        />

        <div className="space-y-4 sm:space-y-6">
          {events.map((event, i) => (
            <div key={event.id}
              className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/10 transition-all duration-400"
              style={{ animationDelay: `${i * 100}ms` }}>

              {/* Date badge */}
              <div className="flex-shrink-0 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 w-full sm:w-20 sm:h-20 h-14 rounded-xl gold-gradient text-black px-4 sm:px-0">
                <span className="text-xs font-bold font-[var(--font-lato)] tracking-widest">{event.month}</span>
                <span className="text-3xl font-[var(--font-playfair)] font-black leading-none">{event.day}</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-[var(--font-playfair)] font-bold text-white group-hover:text-[var(--gold-pale)] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                      <span className="text-[var(--gold)] text-sm font-[var(--font-lato)]">
                        📍 {event.venue} — {event.city}/{event.state}
                      </span>
                      <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                      <span className="text-gray-400 text-sm font-[var(--font-lato)]">{event.available_spots} vagas disponíveis</span>
                    </div>
                  </div>
                  <div className="sm:flex-shrink-0">
                    <GoldButton href={event.whatsapp_link} variant="outline" size="sm" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center">
                      Quero Participar →
                    </GoldButton>
                  </div>
                </div>
                <p className="mt-3 text-gray-400 text-sm font-[var(--font-lato)] leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 sm:mt-10 font-[var(--font-lato)]">
          Novos eventos são adicionados frequentemente.{" "}
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">
            Fale conosco no WhatsApp
          </a>{" "}
          para ser avisado em primeira mão.
        </p>
      </div>
    </section>
  );
}
