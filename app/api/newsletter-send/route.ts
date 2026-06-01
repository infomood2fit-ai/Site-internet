import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID ?? 5);
const TEMPLATE_ID = 8;

// ── Helpers ──────────────────────────────────────────────────

function getMonthLabel(): string {
  return new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

// ── Requêtes Supabase ────────────────────────────────────────

async function getStats() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();

  // Membres actifs ce mois
  const { count: active_members } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("last_active_at", start.toISOString())
    .lt("last_active_at", end.toISOString());

  // Nouveaux membres ce mois
  const { count: chiffre_fort } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString());

  // Posts partagés ce mois
  const { count: post } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString());

  // Séances partagées ce mois
  const { count: seance } = await supabase
    .from("session_logs")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString());

  return {
    active_members: active_members ?? 0,
    chiffre_fort: chiffre_fort ?? 0,
    post: post ?? 0,
    seance: seance ?? 0,
  };
}

async function getBadgeduMois() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("user_badges")
    .select("badge_id, badges(title, description)")
    .gte("awarded_at", start.toISOString())
    .limit(100);

  if (!data || data.length === 0) {
    return { badge_titre: "—", badge_description: "—", badge_nb: 0 };
  }

  // Compter le badge le plus attribué
  const counts: Record<string, { titre: string; description: string; nb: number }> = {};
  for (const row of data) {
    const id = row.badge_id;
    const badge = row.badges as { title: string; description: string } | null;
    if (!counts[id]) {
      counts[id] = { titre: badge?.title ?? "—", description: badge?.description ?? "—", nb: 0 };
    }
    counts[id].nb++;
  }

  const top = Object.values(counts).sort((a, b) => b.nb - a.nb)[0];
  return { badge_titre: top.titre, badge_description: top.description, badge_nb: top.nb };
}

async function getChallengeduMois() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("user_challenges")
    .select("challenge_id, challenges(title, period)")
    .gte("period_start", start.toISOString())
    .limit(100);

  if (!data || data.length === 0) {
    return { challenge_titre: "—", challenge_sport: "—", challenge_nb: 0 };
  }

  const counts: Record<string, { titre: string; sport: string; nb: number }> = {};
  for (const row of data) {
    const id = row.challenge_id;
    const challenge = row.challenges as { title: string; period: string } | null;
    if (!counts[id]) {
      counts[id] = { titre: challenge?.title ?? "—", sport: challenge?.period ?? "—", nb: 0 };
    }
    counts[id].nb++;
  }

  const top = Object.values(counts).sort((a, b) => b.nb - a.nb)[0];
  return { challenge_titre: top.titre, challenge_sport: top.sport, challenge_nb: top.nb };
}

async function getSeancduMois() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("session_logs")
    .select("preset_id, preset_sessions(title, sport, duration_min)")
    .gte("created_at", start.toISOString())
    .not("preset_id", "is", null)
    .limit(200);

  if (!data || data.length === 0) {
    return { seance_titre: "—", seance_type: "—", seance_duree: "—", seance_nb: 0 };
  }

  const counts: Record<string, { titre: string; type: string; duree: number; nb: number }> = {};
  for (const row of data) {
    const id = row.preset_id;
    const preset = row.preset_sessions as { title: string; sport: string; duration_min: number } | null;
    if (!counts[id]) {
      counts[id] = { titre: preset?.title ?? "—", type: preset?.sport ?? "—", duree: preset?.duration_min ?? 0, nb: 0 };
    }
    counts[id].nb++;
  }

  const top = Object.values(counts).sort((a, b) => b.nb - a.nb)[0];
  return {
    seance_titre: top.titre,
    seance_type: top.type,
    seance_duree: `${top.duree} min`,
    seance_nb: top.nb,
  };
}

async function getTopBadges() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("user_badges")
    .select("user_id, badge_id, awarded_at, profiles(full_name, username), badges(title)")
    .gte("awarded_at", start.toISOString())
    .order("awarded_at", { ascending: false })
    .limit(3);

  const fallback = { name: "—", city: "—", sport: "—", badge: "—", emoji: "🏅" };

  const format = (row: typeof data extends Array<infer T> ? T : never) => ({
    name: (row.profiles as { full_name: string } | null)?.full_name ?? "—",
    city: (row.profiles as { username: string } | null)?.username ?? "—",
    sport: "—",
    badge: (row.badges as { title: string } | null)?.title ?? "—",
    emoji: "🏅",
  });

  return {
    badge1: data?.[0] ? format(data[0]) : fallback,
    badge2: data?.[1] ? format(data[1]) : fallback,
    badge3: data?.[2] ? format(data[2]) : fallback,
  };
}

async function getStoryduMois() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("session_feedback")
    .select("message, mood, user_id, profiles(full_name, username)")
    .gte("created_at", start.toISOString())
    .not("message", "is", null)
    .limit(50);

  if (!data || data.length === 0) {
    return { story_quote: "—", story_name: "—", story_city: "—", story_sport: "—" };
  }

  const random = data[Math.floor(Math.random() * data.length)];
  return {
    story_quote: random.message ?? "—",
    story_name: (random.profiles as { full_name: string } | null)?.full_name ?? "—",
    story_city: (random.profiles as { username: string } | null)?.username ?? "—",
    story_sport: random.mood ?? "—",
  };
}

async function getAvis() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from("feedback")
    .select("message, email, profiles(full_name)")
    .gte("created_at", start.toISOString())
    .not("message", "is", null)
    .order("rating", { ascending: false })
    .limit(2);

  const fallback = { text: "—", from: "—" };

  return {
    avis1: data?.[0] ? { text: data[0].message ?? "—", from: (data[0].profiles as { full_name: string } | null)?.full_name ?? data[0].email ?? "—" } : fallback,
    avis2: data?.[1] ? { text: data[1].message ?? "—", from: (data[1].profiles as { full_name: string } | null)?.full_name ?? data[1].email ?? "—" } : fallback,
  };
}

// ── Envoi campagne Brevo ─────────────────────────────────────

async function sendBrevoNewsletter(params: Record<string, string | number>) {
  const now = new Date();
  // Planifié dans 5 minutes pour laisser le temps
  const scheduledAt = new Date(now.getTime() + 5 * 60 * 1000).toISOString();

  const res = await fetch("https://api.brevo.com/v3/emailCampaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      name: `Newsletter Mood2Fit — ${params.month}`,
      subject: `🏋️ Mood2Fit · ${params.month} — La commu bouge fort`,
      sender: { name: "Mood2Fit", email: "hello@mood2fit.com" },
      type: "classic",
      templateId: TEMPLATE_ID,
      recipients: { listIds: [BREVO_LIST_ID] },
      params,
      scheduledAt,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Brevo campaign error:", data);
    return { success: false, error: data };
  }

  // Envoyer la campagne
  const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${data.id}/sendNow`, {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY },
  });

  if (!sendRes.ok) {
    const sendData = await sendRes.json();
    console.error("Brevo sendNow error:", sendData);
    return { success: false, error: sendData };
  }

  return { success: true, campaignId: data.id };
}

// ── HANDLER PRINCIPAL ────────────────────────────────────────

export async function GET() {
  try {
    console.log("=== NEWSLETTER SEND — Mood2Fit ===");

    // 1. Récupère toutes les données
    const [stats, badge, challenge, seance, topBadges, story, avis] = await Promise.all([
      getStats(),
      getBadgeduMois(),
      getChallengeduMois(),
      getSeancduMois(),
      getTopBadges(),
      getStoryduMois(),
      getAvis(),
    ]);

    // 2. Construit les paramètres de la newsletter
    const params: Record<string, string | number> = {
      month: getMonthLabel(),

      // Stats
      active_members: stats.active_members,
      chiffre_fort: stats.chiffre_fort,
      post: stats.post,
      seance: stats.seance,

      // Badge du mois
      badge_titre: badge.badge_titre,
      badge_description: badge.badge_description,
      badge_nb: badge.badge_nb,

      // Challenge du mois
      challenge_titre: challenge.challenge_titre,
      challenge_sport: challenge.challenge_sport,
      challenge_nb: challenge.challenge_nb,

      // Séance du mois
      seance_titre: seance.seance_titre,
      seance_type: seance.seance_type,
      seance_duree: seance.seance_duree,
      seance_nb: seance.seance_nb,

      // Top badges
      badge1_name: topBadges.badge1.name,
      badge1_city: topBadges.badge1.city,
      badge1_sport: topBadges.badge1.sport,
      badge1_badge: topBadges.badge1.badge,
      badge1_emoji: topBadges.badge1.emoji,
      badge2_name: topBadges.badge2.name,
      badge2_city: topBadges.badge2.city,
      badge2_sport: topBadges.badge2.sport,
      badge2_badge: topBadges.badge2.badge,
      badge2_emoji: topBadges.badge2.emoji,
      badge3_name: topBadges.badge3.name,
      badge3_city: topBadges.badge3.city,
      badge3_sport: topBadges.badge3.sport,
      badge3_badge: topBadges.badge3.badge,
      badge3_emoji: topBadges.badge3.emoji,

      // Histoire du mois
      story_quote: story.story_quote,
      story_name: story.story_name,
      story_city: story.story_city,
      story_sport: story.story_sport,

      // Avis
      avis1_text: avis.avis1.text,
      avis1_from: avis.avis1.from,
      avis2_text: avis.avis2.text,
      avis2_from: avis.avis2.from,

      // Changements — à remplir manuellement dans Vercel
      change1: process.env.NEWSLETTER_CHANGE1 ?? "Amélioration des performances",
      change2: process.env.NEWSLETTER_CHANGE2 ?? "Nouveaux badges disponibles",

      // Événements — à remplir manuellement dans Vercel
      event1_day: process.env.NEWSLETTER_EVENT1_DAY ?? "01",
      event1_month: process.env.NEWSLETTER_EVENT1_MONTH ?? "Août",
      event1_title: process.env.NEWSLETTER_EVENT1_TITLE ?? "Lancement officiel",
      event1_sub: process.env.NEWSLETTER_EVENT1_SUB ?? "L'app est disponible sur les stores",
      event1_tag: process.env.NEWSLETTER_EVENT1_TAG ?? "App",
      event2_day: process.env.NEWSLETTER_EVENT2_DAY ?? "15",
      event2_month: process.env.NEWSLETTER_EVENT2_MONTH ?? "Août",
      event2_title: process.env.NEWSLETTER_EVENT2_TITLE ?? "Challenge communautaire",
      event2_sub: process.env.NEWSLETTER_EVENT2_SUB ?? "Premier challenge officiel Mood2Fit",
      event2_tag: process.env.NEWSLETTER_EVENT2_TAG ?? "Challenge",
    };

    // 3. Envoie la campagne Brevo
    const result = await sendBrevoNewsletter(params);

    if (!result.success) {
      return NextResponse.json({ error: "Erreur envoi campagne Brevo", details: result.error }, { status: 500 });
    }

    console.log(`✅ Newsletter envoyée — campagne #${result.campaignId}`);
    console.log("===================================");

    return NextResponse.json({
      success: true,
      campaignId: result.campaignId,
      params,
    });

  } catch (error) {
    console.error("Erreur newsletter-send:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}