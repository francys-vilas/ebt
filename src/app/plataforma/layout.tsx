import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plataforma — Amor Extraordinário | Casal Baruc",
  description: "Acesse o curso completo do Casal Baruc. Módulos, aulas em vídeo e conteúdo transformador para o seu relacionamento.",
};

export default function PlataformaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
