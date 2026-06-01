import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { sanitizeEmail, sanitizeText, isValidEmail, isBot } from "@/lib/sanitize";
import { addContact, sendNewsletterConfirmation } from "@/lib/email";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {

    // ── 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    console.log("IP détectée:", ip); // ajoute ça temporairement
    const { success } = await ratelimit.limit(`newsletter:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessaie dans une heure." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // ── 2. Honeypot anti-bot
    if (isBot(body._trap)) {
      return NextResponse.json({ success: true });
    }

    // ── 3. Sanitization + validation
    const cleanEmail     = sanitizeEmail(body.email);
    const cleanFirstname = sanitizeText(body.firstname || "", 50);

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // ── 4. Ajouter contact via lib/email.ts
    const contactResult = await addContact({
      email: cleanEmail,
      firstname: cleanFirstname,
    });

    if (!contactResult.success) {
      if ("error" in contactResult && contactResult.error === "duplicate") {
        return NextResponse.json(
          { error: "Cet email est déjà inscrit à la newsletter." },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: "Erreur ajout contact" }, { status: 500 });
    }

    // ── 5. Email de confirmation via lib/email.ts
    await sendNewsletterConfirmation(cleanEmail);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}