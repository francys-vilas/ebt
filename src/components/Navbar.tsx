"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "Sobre Nós" },
    { href: "#agenda", label: "Agenda" },
    { href: "#curso", label: "Curso" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/50 border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-sm font-[var(--font-playfair)]">
            CB
          </div>
          <span
            className="text-xl font-[var(--font-playfair)] font-bold tracking-wide gold-text"
          >
            Casal Baruc
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-[var(--gold)] transition-colors duration-300 font-[var(--font-lato)] tracking-wider uppercase"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/plataforma"
            className="px-5 py-2.5 gold-gradient rounded-full text-black text-sm font-bold font-[var(--font-lato)] tracking-wide btn-pulse transition-all hover:opacity-90"
          >
            Acessar Curso
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-[var(--gold)] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--gold)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--gold)] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-[var(--gold)] transition-colors py-2 border-b border-[var(--border)] font-[var(--font-lato)]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/plataforma"
            className="text-center px-5 py-3 gold-gradient rounded-full text-black font-bold font-[var(--font-lato)]"
            onClick={() => setMenuOpen(false)}
          >
            Acessar Curso
          </Link>
        </div>
      )}
    </nav>
  );
}
