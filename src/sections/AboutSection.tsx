import SectionTitle from "@/components/SectionTitle";

const teamMembers = [
  {
    name: "Edson",
    role: "Palestrante & Mentor",
    bio: "Com mais de 8 anos dedicados a transformar relacionamentos, Edson combina experiência pessoal, psicologia relacional e princípios bíblicos para ajudar casais a encontrarem propósito e plenitude juntos.",
    emoji: "🎤",
    skills: ["Comunicação", "Liderança", "Propósito"],
  },
  {
    name: "Kellin",
    role: "Palestrante & Mentora",
    bio: "Especialista em inteligência emocional e conexão profunda, Kellin ajuda casais a desenvolverem intimidade real e a superarem as barreiras emocionais que impedem um amor extraordinário.",
    emoji: "💛",
    skills: ["Intimidade", "Emoções", "Conexão"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 bg-[var(--surface)] relative overflow-hidden">
      {/* Decorative gold circle */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[var(--gold)]/10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-[var(--gold)]/10" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Quem somos"
          title="Conheça o Casal Baruc"
          subtitle="Somos um casal que descobriu na própria jornada o poder de um relacionamento transformador. Hoje, nossa missão é inspirar outros casais a construírem o mesmo."
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="gold-border-animated rounded-2xl p-8 bg-[var(--card)] group"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {member.emoji}
              </div>

              <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[var(--gold)] text-sm font-[var(--font-lato)] tracking-wider uppercase mb-4">
                {member.role}
              </p>

              <div className="h-px w-12 gold-gradient mb-5" />

              <p className="text-gray-400 font-[var(--font-lato)] leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full border border-[var(--gold)]/40 text-[var(--gold-pale)] font-[var(--font-lato)] tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
