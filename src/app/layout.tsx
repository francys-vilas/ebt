import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Casal Baruc — Transformando Relacionamentos",
  description:
    "Palestras, eventos e cursos online do Casal Baruc. Descubra como construir um relacionamento sólido, apaixonado e duradouro.",
  keywords: ["casal", "relacionamento", "palestra", "curso", "casamento", "Casal Baruc"],
  openGraph: {
    title: "Casal Baruc — Transformando Relacionamentos",
    description: "Palestras e cursos para casais que querem um relacionamento extraordinário.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
