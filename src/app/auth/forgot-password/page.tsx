"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    });

    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
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
            Recuperar acesso
          </p>
        </div>

        <div className="rounded-2xl p-8 border border-[var(--border)]" style={{ backgroundColor: "var(--surface)" }}>
          {sent ? (
            <div className="text-center flex flex-col gap-4">
              <div className="w-14 h-14 rounded-full border border-[var(--gold)] flex items-center justify-center mx-auto text-2xl">
                ✉️
              </div>
              <p className="text-white font-[var(--font-playfair)] text-lg">E-mail enviado!</p>
              <p className="text-gray-400 text-sm font-[var(--font-lato)] leading-relaxed">
                Verifique sua caixa de entrada e clique no link para criar uma nova senha.
              </p>
              <Link
                href="/login"
                className="text-xs text-[var(--gold)] hover:opacity-80 transition-opacity font-[var(--font-lato)] mt-2"
              >
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <p className="text-gray-400 text-sm font-[var(--font-lato)] leading-relaxed">
                Digite o e-mail cadastrado e enviaremos um link para redefinir sua senha.
              </p>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-black text-sm font-bold font-[var(--font-lato)] tracking-wide transition-all duration-300 gold-gradient disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : "Enviar link"}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-xs text-gray-500 hover:text-[var(--gold)] transition-colors font-[var(--font-lato)]"
                >
                  ← Voltar ao login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
