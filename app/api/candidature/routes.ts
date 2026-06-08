import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { sanitizeText, sanitizeEmail, isValidEmail, isBot } from "@/lib/sanitize";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(3, "60 m"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const { success } = await ratelimit.limit(`candidature:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de candidatures envoyées. Réessaie dans une heure." },
        { status: 429 }
      );
    }

    // ── Lecture du FormData (supporte fichier CV) ──
    const formData = await req.formData();

    const name    = formData.get("name") as string;
    const email   = formData.get("email") as string;
    const poste   = formData.get("poste") as string;
    const message = formData.get("message") as string;
    const honeypot = formData.get("_trap") as string;
    const cvFile  = formData.get("cv") as File | null;

    // Anti-bot
    if (isBot(honeypot)) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !poste || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const cleanName    = sanitizeText(name, 80);
    const cleanEmail   = sanitizeEmail(email);
    const cleanPoste   = sanitizeText(poste, 120);
    const cleanMessage = sanitizeText(message, 2000);

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // ── Lecture du CV si présent ──
    let cvAttachment = undefined;
    if (cvFile && cvFile.size > 0) {
      const maxSize = 5 * 1024 * 1024; // 5 Mo
      if (cvFile.size > maxSize) {
        return NextResponse.json({ error: "CV trop lourd (max 5 Mo)" }, { status: 400 });
      }
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(cvFile.type)) {
        return NextResponse.json({ error: "Format CV non accepté (PDF ou Word uniquement)" }, { status: 400 });
      }
      const buffer = await cvFile.arrayBuffer();
      cvAttachment = {
        content: Buffer.from(buffer).toString("base64"),
        name: cvFile.name,
        type: cvFile.type,
      };
    }

    // ── Envoi email ──
    const result = await sendEmail({
      to: [{ email: "hello@mood2fit.com" }],
      replyTo: { email: cleanEmail, name: cleanName },
      subject: `[Candidature] ${cleanPoste} — ${cleanName}`,
      htmlContent: getCandidatureHtml({
        name: cleanName,
        email: cleanEmail,
        poste: cleanPoste,
        message: cleanMessage,
        cvName: cvFile?.name,
      }),
      ...(cvAttachment && {
        attachment: [{
          content: cvAttachment.content,
          name: cvAttachment.name,
        }],
      }),
    });

    if (!result.success) {
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Candidature error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function getCandidatureHtml({ name, email, poste, message, cvName }: {
  name: string; email: string; poste: string; message: string; cvName?: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f0eff4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff4;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;border-radius:16px;overflow:hidden;background:#ffffff;">
          <tr>
            <td style="background-color:#000000;padding:24px;">
              <span style="font-size:20px;font-weight:700;color:#ffffff;">Mood</span>
              <span style="font-size:20px;font-weight:700;color:#f72585;">2Fit</span>
              <span style="float:right;font-size:11px;font-weight:700;color:#f72585;letter-spacing:2px;text-transform:uppercase;">Nouvelle candidature</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#000000;padding:0 24px 40px;border-bottom:3px solid #f72585;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px 0;">Recrutement</p>
              <p style="font-size:32px;font-weight:900;color:#ffffff;line-height:1.05;margin:0 0 4px 0;text-transform:uppercase;">Candidature reçue.</p>
              <p style="font-size:15px;color:rgba(255,255,255,0.5);margin:8px 0 0 0;">Une nouvelle candidature spontanée vient d'arriver.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#fff;padding:28px 24px 0;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">Candidat</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #eee;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;width:100px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Nom</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;color:#000;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#f72585;text-decoration:none;font-weight:600;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Poste</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;color:#000;font-weight:600;">${poste}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1px;">CV</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;color:#000;font-weight:600;">${cvName ? `📎 ${cvName} (en pièce jointe)` : "Non fourni"}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#fff;padding:24px;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">Motivation</p>
              <div style="background:#f7f7f7;border-radius:12px;padding:20px 24px;border-left:4px solid #f72585;">
                <p style="font-size:15px;color:#333;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#fff;padding:0 24px 32px;text-align:center;">
              <a href="mailto:${email}?subject=Re: Candidature ${poste}" style="display:inline-block;background:#f72585;color:#fff;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:100px;">Répondre à ${name}</a>
            </td>
          </tr>
          <tr>
            <td style="background:#000;padding:24px;text-align:center;">
              <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">Candidature reçue via mood2fit.com/recrutons</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}