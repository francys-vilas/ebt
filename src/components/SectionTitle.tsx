interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {label && (
        <p className="text-xs font-[var(--font-lato)] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-playfair)] font-bold text-white leading-tight">
        {title}
      </h2>
      {/* Gold underline accent */}
      <div className={`mt-4 h-0.5 w-16 gold-gradient ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="mt-5 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-[var(--font-lato)] font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
