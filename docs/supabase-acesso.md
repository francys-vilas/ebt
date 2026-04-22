# Acesso ao Supabase — Como funciona

## Variáveis de ambiente necessárias

Todas ficam em `.env.local` na raiz do projeto. **Nunca commitar esse arquivo.**

| Variável | Onde fica | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Chave pública (segura expor no browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Chave admin — **nunca expor no client** |

Onde encontrar no painel: **Supabase → Project Settings → API**

---

## Os três clientes Supabase

### 1. Cliente browser (`createBrowserClient`)
Usado em componentes React client-side (`"use client"`).
Usa a **anon key**. Respeita RLS.

```ts
// Usado em: src/app/login/page.tsx, src/app/plataforma/page.tsx
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 2. Cliente servidor (`createServerClient`)
Usado no middleware e Server Components. Lê os cookies da requisição para
identificar o usuário autenticado. Usa a **anon key + sessão do cookie**.

```ts
// Usado em: src/middleware.ts
import { createServerClient } from "@supabase/ssr";
```

### 3. Cliente admin (`supabaseAdmin`)
Usado apenas server-side (middleware, Server Actions, API routes).
Usa a **service role key** — bypassa RLS completamente.

```ts
// Arquivo: src/lib/supabaseAdmin.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";
```

---

## Passo a passo do fluxo de acesso

### Login (`/login`)
1. Usuário preenche e-mail e senha
2. `supabase.auth.signInWithPassword()` é chamado com a **anon key**
3. Supabase valida as credenciais e devolve um **JWT de sessão**
4. O `@supabase/ssr` salva esse JWT nos **cookies** do browser
5. Usuário é redirecionado para `/plataforma`

### Acesso à plataforma (`/plataforma`)
1. Requisição chega → **middleware** intercepta
2. Middleware lê o JWT do cookie e chama `supabase.auth.getUser()`
3. Se não houver usuário autenticado → redireciona para `/login`
4. Se autenticado → deixa passar

### Acesso ao admin (`/admin`)
1. Middleware intercepta a requisição
2. Verifica se há usuário autenticado (igual ao passo da plataforma)
3. Se não autenticado → redireciona para `/login`
4. Se autenticado → instancia o **cliente admin** (service role)
5. Busca `role` na tabela `profiles` onde `id = user.id`
6. Se `role !== "admin"` → redireciona para `/plataforma`
7. Se `role === "admin"` → deixa passar

### Exibição do botão "Painel Admin" no dropdown
1. Componente `PlatformNavbar` monta no browser
2. Chama `supabase.auth.getUser()` para pegar o usuário logado
3. Busca `profiles` onde `id = user.id` (usando a **anon key** + JWT de sessão)
4. RLS permite a leitura porque a policy `"Users can read own profile"` valida `auth.uid() = id`
5. Se `profile.role === "admin"` → exibe o link **Painel Admin**

---

## Tabela `profiles` no banco

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | Mesmo ID do `auth.users` |
| `role` | `user_role` (enum) | Valor: `"admin"` ou outro |
| `created_at` | `timestamptz` | Criação automática |

### RLS (Row Level Security)

A tabela tem RLS ativo. A policy configurada é:

```sql
-- Permite que cada usuário leia apenas o próprio perfil
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);
```

**Atenção:** Não criar policies que referenciam a própria tabela `profiles`
dentro da condição `USING` — causa recursão infinita.

### Como adicionar um usuário admin

Rodar o script (precisa da service role key no `.env.local`):

```bash
node scripts/setup-admin.mjs
```

O script:
1. Lista todos os usuários via `auth.admin.listUsers()`
2. Encontra o usuário pelo e-mail definido em `ADMIN_EMAIL`
3. Faz upsert em `profiles` com `{ id, role: "admin" }`

---

## Onde cada arquivo se encaixa

```
src/
├── middleware.ts              # Proteção de rotas — roda em toda requisição
├── lib/
│   ├── supabaseClient.ts      # Cliente anon (legado, pouco usado)
│   └── supabaseAdmin.ts       # Cliente service role — só server-side
└── app/
    ├── login/page.tsx         # Login com signInWithPassword
    └── plataforma/page.tsx    # Navbar busca role do usuário (client-side)

scripts/
└── setup-admin.mjs            # Cria/atualiza usuário como admin no banco

.env.local                     # Chaves — nunca commitar
```

---

## Regras importantes

- `SUPABASE_SERVICE_ROLE_KEY` **nunca** pode ser usada em código client-side
  (componentes com `"use client"` ou qualquer arquivo importado pelo browser).
  Se vazar, qualquer pessoa tem acesso total ao banco ignorando RLS.
- `NEXT_PUBLIC_*` são expostas publicamente no bundle do browser — só colocar
  dados que podem ser públicos (URL e anon key são seguros).
- O middleware roda no **Edge Runtime** — não usar imports pesados nem Node.js APIs.
