// TEMPORARY static login (requested for the first release).
// This is a client-side gate only — it hides the portal UI but does NOT protect
// the product apps or their APIs. Replace with a real auth service before
// handing the portal to customers.

const DEMO_USER = { email: "product@analytx4t.com", password: "12345678", name: "Product Team" };
const KEY = "a4t.session";

export function login(email, password) {
  const ok = email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
  if (!ok) return { ok: false, error: "That email and password don't match our records." };
  const session = { email: DEMO_USER.email, name: DEMO_USER.name, at: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(session)); } catch { /* private mode */ }
  return { ok: true, session };
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

export function logout() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
