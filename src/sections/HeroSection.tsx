"use client";
import { useEffect, useRef } from "react";
import GoldButton from "@/components/GoldButton";

function Counter({ end, formatter }: { end: number; formatter?: (val: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.dataset.animated === "true") return;
          el.dataset.animated = "true";

          let start = 0;
          const duration = 2000;
          const step = end / (duration / 16);

          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              start = end;
              clearInterval(timer);
            }
            el.textContent = formatter ? formatter(Math.floor(start)) : `${Math.floor(start)}+`;
          }, 16);

          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, formatter]);

  return <span ref={ref}>0</span>;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1920&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Gold vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--bg)]" />
      {/* Horizontal gold gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-24 pb-10 sm:pt-24 sm:pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[var(--gold)] bg-[var(--gold)]/10 mb-6 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[var(--gold)] text-xs font-[var(--font-lato)] tracking-widest uppercase">
            Palestrantes & Mentores de Casal
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 sm:mb-6">
          <span className="text-white">Amor que</span>{" "}
          <em className="gold-text not-italic">Transforma</em>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 font-[var(--font-lato)] font-light leading-relaxed">
          O Casal Baruc inspira relacionamentos extraordinários por meio de
          palestras, eventos e um curso completo que já ajudou milhares de
          casais.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <GoldButton href="#agenda" size="lg" pulse>
            Ver Agenda de Eventos
          </GoldButton>
          <GoldButton href="/login" variant="outline" size="lg">
            ✨ Acessar o Curso
          </GoldButton>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
          {[
            { label: "Anos de Experiência", end: 8 },
            {
              label: "Casais Impactados",
              end: 50000,
              formatter: (v: number) => `${Math.floor(v / 1000)}k+`
            },
            { label: "Eventos Realizados", end: 200 },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-[var(--font-playfair)] font-bold gold-text">
                <Counter end={stat.end} formatter={stat.formatter} />
              </div>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1 font-[var(--font-lato)] tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce mt-12 sm:mt-16">
          <span className="text-gray-500 text-xs font-[var(--font-lato)] tracking-widest uppercase">
            Rolar
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
