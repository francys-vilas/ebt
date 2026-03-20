import SectionTitle from "@/components/SectionTitle";
import GoldButton from "@/components/GoldButton";
import { events } from "@/data/mockData";

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-28 px-6 bg-[var(--bg)] relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(201,168,76,0.3) 20px,
            rgba(201,168,76,0.3) 21px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          label="Próximos Eventos"
          title="Nossa Agenda"
          subtitle="Encontre o evento mais próximo de você e venha viver uma experiência que vai transformar o seu relacionamento."
        />

        <div className="space-y-6">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/10 transition-all duration-400"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Date badge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl gold-gradient text-black">
                <span className="text-xs font-bold font-[var(--font-lato)] tracking-widest">
                  {event.month}
                </span>
                <span className="text-3xl font-[var(--font-playfair)] font-black leading-none">
                  {event.day}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-[var(--font-playfair)] font-bold text-white group-hover:text-[var(--gold-pale)] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-[var(--gold)] text-sm font-[var(--font-lato)]">
                        📍 {event.venue} — {event.city}/{event.state}
                      </span>
                      <span className="text-gray-500 text-xs">•</span>
                      <span className="text-gray-400 text-sm font-[var(--font-lato)]">
                        {event.availableSpots} vagas disponíveis
                      </span>
                    </div>
                  </div>
                  <GoldButton
                    href={event.whatsappLink}
                    variant="outline"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero Participar →
                  </GoldButton>
                </div>

                <p className="mt-3 text-gray-400 text-sm font-[var(--font-lato)] leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 text-sm mt-10 font-[var(--font-lato)]">
          Novos eventos são adicionados frequentemente.{" "}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gold)] hover:underline"
          >
            Fale conosco no WhatsApp
          </a>{" "}
          para ser avisado em primeira mão.
        </p>
      </div>
    </section>
  );
}
