const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
const COOLDOWN_MS = 60_000;

export const PHONE_FALLBACK = "+381 14 246 079";

export function isCoolingDown(key: string): boolean {
  try {
    return Date.now() - Number(sessionStorage.getItem(key) || 0) < COOLDOWN_MS;
  } catch {
    return false; // sessionStorage unavailable — skip throttle
  }
}

export function markSent(key: string) {
  try {
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // ignore
  }
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** POSTs JSON or multipart FormData to the same Formspree endpoint the contact form uses. */
export async function submitToFormspree(body: Record<string, string> | FormData): Promise<SubmitResult> {
  if (!FORM_ENDPOINT) {
    console.error("VITE_FORMSPREE_ENDPOINT is not set");
    return { ok: false, error: `Slanje trenutno nije dostupno. Pozovite nas na ${PHONE_FALLBACK}.` };
  }
  const isForm = body instanceof FormData;
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: isForm ? { Accept: "application/json" } : { "Content-Type": "application/json", Accept: "application/json" },
      body: isForm ? body : JSON.stringify(body),
    });
    if (response.ok) return { ok: true };
    return { ok: false, error: `Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite na ${PHONE_FALLBACK}.` };
  } catch {
    return { ok: false, error: "Greška u slanju. Proverite internet vezu i pokušajte ponovo." };
  }
}
