// Shared input-sanitisation helpers for public form endpoints.
// Prevents HTML/script injection into the notification emails and enforces sane limits.

export function esc(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .slice(0, 2000) // hard length cap to prevent oversized payloads
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isValidEmail(value: unknown): boolean {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

// Collapse and cap a plain-text field (used for subject lines etc.)
export function clean(value: unknown, max = 200): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[\r\n]+/g, " ").trim().slice(0, max);
}
