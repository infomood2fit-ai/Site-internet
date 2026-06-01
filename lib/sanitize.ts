export function sanitizeText(input: string, maxLength = 1000): string {
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, "")
    .trim();
}

export function sanitizeEmail(input: string): string {
  return input.slice(0, 100).trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isBot(trap: unknown): boolean {
  return typeof trap === "string" && trap.length > 0;
}