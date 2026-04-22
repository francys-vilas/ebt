import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vicmptfgviihwytfszpl.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY21wdGZndmlpaHd5dGZzenBsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NzgxNywiZXhwIjoyMDkwNjUzODE3fQ.ZdiSosIUdp4u-oIMVaCZyzIOvwOoiYmShTgDI4gQd9c";
const ADMIN_EMAIL = "franvilasnovas@gmail.com";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 1. Find user by email
const { data: { users }, error: usersError } = await admin.auth.admin.listUsers();
if (usersError) { console.error("Error listing users:", usersError.message); process.exit(1); }

const user = users.find(u => u.email === ADMIN_EMAIL);
if (!user) { console.error(`User ${ADMIN_EMAIL} not found`); process.exit(1); }
console.log(`Found user: ${user.id} (${user.email})`);

// 2. Upsert profile with role=admin
const { error: upsertError } = await admin.from("profiles").upsert(
  { id: user.id, role: "admin" },
  { onConflict: "id" }
);
if (upsertError) {
  console.error("Error upserting profile:", upsertError.message);
  process.exit(1);
}
console.log("Profile upserted with role=admin");

// 3. Verify
const { data: profile, error: fetchError } = await admin.from("profiles").select("*").eq("id", user.id).single();
if (fetchError) { console.error("Verify error:", fetchError.message); process.exit(1); }
console.log("Profile verified:", profile);
