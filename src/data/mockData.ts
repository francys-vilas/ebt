// ── Mock data for Casal Baruc app ─────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  date: string;
  rawDate: string; // ISO for sorting
  month: string;
  day: string;
  city: string;
  state: string;
  venue: string;
  description: string;
  availableSpots: number;
  whatsappLink: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoId: string; // YouTube video ID
  description: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  featuredBanner: string;
  totalHours: string;
  totalLessons: number;
  rating: number;
  studentsCount: number;
  modules: Module[];
}

// ── Events ────────────────────────────────────────────────────────────────

export const events: Event[] = [
  {
    id: "1",
    title: "Amor que Transforma — Palestra ao Vivo",
    date: "05 de Abril, 2025",
    rawDate: "2025-04-05",
    month: "ABR",
    day: "05",
    city: "São Paulo",
    state: "SP",
    venue: "Centro de Convenções São Paulo",
    description:
      "Uma noite especial para casais que desejam renovar o compromisso e redescobrir o amor verdadeiro.",
    availableSpots: 120,
    whatsappLink: "https://wa.me/5511999999999?text=Quero+participar+do+evento+em+SP",
  },
  {
    id: "2",
    title: "Conexão Profunda — Workshop para Casais",
    date: "19 de Abril, 2025",
    rawDate: "2025-04-19",
    month: "ABR",
    day: "19",
    city: "Curitiba",
    state: "PR",
    venue: "Hotel Slaviero Essential",
    description:
      "Um workshop intensivo de um dia com dinâmicas, reflexões e ferramentas práticas para o casal.",
    availableSpots: 60,
    whatsappLink: "https://wa.me/5511999999999?text=Quero+participar+do+workshop+em+CWB",
  },
  {
    id: "3",
    title: "Casamento Extraordinário — Palestra",
    date: "10 de Maio, 2025",
    rawDate: "2025-05-10",
    month: "MAI",
    day: "10",
    city: "Rio de Janeiro",
    state: "RJ",
    venue: "Teatro Carlos Gomes",
    description:
      "Aprenda os segredos de casais que mantêm a paixão e o companheirismo ao longo dos anos.",
    availableSpots: 200,
    whatsappLink: "https://wa.me/5511999999999?text=Quero+participar+do+evento+em+RJ",
  },
  {
    id: "4",
    title: "Reconexão — Retiro para Casais",
    date: "24 de Maio, 2025",
    rawDate: "2025-05-24",
    month: "MAI",
    day: "24",
    city: "Serra Gaúcha",
    state: "RS",
    venue: "Pousada Vale das Videiras",
    description:
      "Um fim de semana imersivo na natureza para casais que querem se reconectar de verdade.",
    availableSpots: 30,
    whatsappLink: "https://wa.me/5511999999999?text=Quero+participar+do+retiro",
  },
];

// ── Course ─────────────────────────────────────────────────────────────────

export const course: Course = {
  id: "amor-extraordinario",
  title: "Amor Extraordinário",
  subtitle: "O curso completo para transformar o seu relacionamento",
  description:
    "Um programa transformador com mais de 40 aulas para casais que querem construir um relacionamento sólido, apaixonado e duradouro. Do autoconhecimento à intimidade, cada módulo foi desenvolvido com carinho pelo Casal Baruc.",
  thumbnail:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
  featuredBanner:
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80",
  totalHours: "12",
  totalLessons: 44,
  rating: 4.9,
  studentsCount: 3847,
  modules: [
    {
      id: "modulo-1",
      title: "Módulo 1 — Fundamentos do Amor",
      description: "Entenda o que é amor de verdade e como construir uma base sólida.",
      thumbnail:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&q=80",
      lessons: [
        {
          id: "aula-1-1",
          title: "O que é amor de verdade?",
          duration: "18 min",
          videoId: "dQw4w9WgXcQ",
          description: "Descubra a diferença entre atração, sentimento e amor maduro.",
        },
        {
          id: "aula-1-2",
          title: "Os 5 pilares de um relacionamento saudável",
          duration: "22 min",
          videoId: "dQw4w9WgXcQ",
          description: "Conheça os fundamentos que sustentam casais felizes de longa data.",
        },
        {
          id: "aula-1-3",
          title: "Autoconhecimento: quem sou eu no relacionamento?",
          duration: "25 min",
          videoId: "dQw4w9WgXcQ",
          description: "Antes de amar o outro, é preciso se conhecer profundamente.",
        },
        {
          id: "aula-1-4",
          title: "Expectativas x Realidade",
          duration: "19 min",
          videoId: "dQw4w9WgXcQ",
          description: "Como alinhar expectativas evita a maioria dos conflitos de casal.",
        },
      ],
    },
    {
      id: "modulo-2",
      title: "Módulo 2 — Comunicação",
      description: "Aprenda a falar e ouvir de forma que transforma o relacionamento.",
      thumbnail:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80",
      lessons: [
        {
          id: "aula-2-1",
          title: "A comunicação não-violenta no casal",
          duration: "20 min",
          videoId: "dQw4w9WgXcQ",
          description: "Técnicas para expressar sentimentos sem gerar conflito.",
        },
        {
          id: "aula-2-2",
          title: "Como ter conversas difíceis",
          duration: "24 min",
          videoId: "dQw4w9WgXcQ",
          description: "Um passo a passo para abordar temas delicados com segurança.",
        },
        {
          id: "aula-2-3",
          title: "Escuta ativa: presença de verdade",
          duration: "17 min",
          videoId: "dQw4w9WgXcQ",
          description: "Aprenda a estar 100% presente durante as conversas com seu parceiro.",
        },
      ],
    },
    {
      id: "modulo-3",
      title: "Módulo 3 — Intimidade",
      description: "Construa uma intimidade genuína em todas as dimensões.",
      thumbnail:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
      lessons: [
        {
          id: "aula-3-1",
          title: "Os tipos de intimidade",
          duration: "21 min",
          videoId: "dQw4w9WgXcQ",
          description: "Intimidade emocional, espiritual, intelectual e física.",
        },
        {
          id: "aula-3-2",
          title: "Como reacender a chama",
          duration: "26 min",
          videoId: "dQw4w9WgXcQ",
          description: "Estratégias práticas para renovar a paixão no dia a dia.",
        },
        {
          id: "aula-3-3",
          title: "Rituais de conexão diária",
          duration: "15 min",
          videoId: "dQw4w9WgXcQ",
          description: "Pequenos hábitos que mantêm o casal conectado mesmo na rotina.",
        },
      ],
    },
    {
      id: "modulo-4",
      title: "Módulo 4 — Gestão de Conflitos",
      description: "Transforme o conflito em crescimento para o casal.",
      thumbnail:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&q=80",
      lessons: [
        {
          id: "aula-4-1",
          title: "Por que brigamos? As raízes do conflito",
          duration: "23 min",
          videoId: "dQw4w9WgXcQ",
          description: "Compreenda os gatilhos emocionais que causam desentendimentos.",
        },
        {
          id: "aula-4-2",
          title: "Como sair do ciclo destrutivo",
          duration: "20 min",
          videoId: "dQw4w9WgXcQ",
          description: "Ferramentas para interromper padrões que prejudicam o relacionamento.",
        },
        {
          id: "aula-4-3",
          title: "Perdão: o maior ato de amor",
          duration: "28 min",
          videoId: "dQw4w9WgXcQ",
          description: "Como o perdão genuíno liberta o casal e abre espaço para recomeços.",
        },
      ],
    },
  ],
};
