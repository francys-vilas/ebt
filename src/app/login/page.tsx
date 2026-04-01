"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/plataforma");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-lg font-[var(--font-playfair)]">
              CB
            </div>
            <span className="text-2xl font-[var(--font-playfair)] font-bold tracking-wide gold-text">
              Casal Baruc
            </span>
          </Link>
          <p className="mt-3 text-gray-400 text-sm font-[var(--font-lato)]">
            Acesse o seu curso
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 border border-[var(--border)]" style={{ backgroundColor: "var(--surface)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-[var(--font-lato)]">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-white text-sm font-[var(--font-lato)] outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[var(--gold)] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.15)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-[var(--font-lato)]">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-white text-sm font-[var(--font-lato)] outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[var(--gold)] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.15)]"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm font-[var(--font-lato)] text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-black text-sm font-bold font-[var(--font-lato)] tracking-wide transition-all duration-300 gold-gradient btn-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:animation-none mt-1"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="text-center">
              <Link
                href="/auth/forgot-password"
                className="text-xs text-gray-500 hover:text-[var(--gold)] transition-colors font-[var(--font-lato)]"
              >
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-gray-600 text-xs font-[var(--font-lato)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </main>
  );
}
