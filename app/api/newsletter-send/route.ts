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

function getMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

// ── Types ─────────────────────────────────────────────────────

type AnyRecord = Record<string, unknown>;

function asObj(val: unknown): AnyRecord {
  if (Array.isArray(val)) return (val[0] ?? {}) as AnyRecord;
  return (val ?? {}) as AnyRecord;
}

// ── Requêtes Supabase ────────────────────────────────────────

async function getStats() {
  const { start, end } = getMonthRange();

  const { count: active_members } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("last_active_at", start)
    .lt("last_active_at", end);

  const { count: chiffre_fort } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start)
    .lt("created_at", end);

  const { count: post } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start)
    .lt("created_at", end);

  const { count: seance } = await supabase
    .from("session_logs")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start)
    .lt("created_at", end);

  return {
    active_members: active_members ?? 0,
    chiffre_fort: chiffre_fort ?? 0,
    post: post ?? 0,
    seance: seance ?? 0,
  };
}

async function getBadgeduMois() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("user_badges")
    .select("badge_id, badges(title, description)")
    .gte("awarded_at", start)
    .lt("awarded_at", end)
    .limit(200);

  if (!data || data.length === 0) {
    return { badge_titre: "—", badge_description: "—", badge_nb: 0 };
  }

  const counts: Record<string, { titre: string; description: string; nb: number }> = {};
  for (const row of data as unknown as AnyRecord[]) {
    const id = String(row.badge_id ?? "");
    const badge = asObj(row.badges);
    if (!counts[id]) {
      counts[id] = {
        titre: String(badge.title ?? "—"),
        description: String(badge.description ?? "—"),
        nb: 0,
      };
    }
    counts[id].nb++;
  }

  const top = Object.values(counts).sort((a, b) => b.nb - a.nb)[0];
  return { badge_titre: top.titre, badge_description: top.description, badge_nb: top.nb };
}

async function getChallengeduMois() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("user_challenges")
    .select("challenge_id, completed, challenges(title)")
    .gte("period_start", start)
    .lt("period_start", end)
    .limit(200);

  if (!data || data.length === 0) {
    return { challenge_titre: "—", challenge_completion_rate: 0, challenge_nb: 0 };
  }

  const counts: Record<string, { titre: string; total: number; completed: number }> = {};
  for (const row of data as unknown as AnyRecord[]) {
    const id = String(row.challenge_id ?? "");
    const challenge = asObj(row.challenges);
    if (!counts[id]) {
      counts[id] = { titre: String(challenge.title ?? "—"), total: 0, completed: 0 };
    }
    counts[id].total++;
    if (row.completed === true) counts[id].completed++;
  }

  const top = Object.values(counts).sort((a, b) => b.total - a.total)[0];
  const rate = top.total > 0 ? Math.round((top.completed / top.total) * 100) : 0;

  return {
    challenge_titre: top.titre,
    challenge_completion_rate: rate,
    challenge_nb: top.total,
  };
}

async function getSeanceduMois() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("session_logs")
    .select("preset_id, preset_sessions(title, sport, duration_min)")
    .gte("created_at", start)
    .lt("created_at", end)
    .not("preset_id", "is", null)
    .limit(500);

  if (!data || data.length === 0) {
    return { seance_titre: "—", seance_type: "—", seance_duree: "—", seance_nb: 0 };
  }

  const counts: Record<string, { titre: string; type: string; duree: number; nb: number }> = {};
  for (const row of data as unknown as AnyRecord[]) {
    const id = String(row.preset_id ?? "");
    const preset = asObj(row.preset_sessions);
    if (!counts[id]) {
      counts[id] = {
        titre: String(preset.title ?? "—"),
        type: String(preset.sport ?? "—"),
        duree: Number(preset.duration_min ?? 0),
        nb: 0,
      };
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
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("user_badges")
    .select("user_id, badge_id, awarded_at, profiles(username), badges(title, slug)")
    .gte("awarded_at", start)
    .lt("awarded_at", end)
    .order("awarded_at", { ascending: false })
    .limit(3);

  const fallback = { name: "—", badge: "—", emoji: "🏅" };

  const emojiMap: Record<string, string> = {
    fire: "🔥", streak: "⚡", runner: "🏃", swimmer: "🏊", lifter: "🏋️",
    yoga: "🧘", cyclist: "🚴", first: "🥇", consistent: "💪", default: "🏅",
  };

  const format = (row: AnyRecord) => {
    const profile = asObj(row.profiles);
    const badge = asObj(row.badges);
    const slug = String(badge.slug ?? "default");
    return {
      name: String(profile.username ?? "—"),
      badge: String(badge.title ?? "—"),
      emoji: emojiMap[slug] ?? emojiMap.default,
    };
  };

  const rows = (data ?? []) as unknown as AnyRecord[];
  return {
    badge1: rows[0] ? format(rows[0]) : fallback,
    badge2: rows[1] ? format(rows[1]) : fallback,
    badge3: rows[2] ? format(rows[2]) : fallback,
  };
}

async function getStoryduMois() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("session_feedback")
    .select("message, session_id, user_id, profiles(username), session_logs(preset_id, preset_sessions(sport))")
    .gte("created_at", start)
    .lt("created_at", end)
    .not("message", "is", null)
    .limit(50);

  if (!data || data.length === 0) {
    return { story_quote: "—", story_name: "—", story_sport: "—" };
  }

  const rows = data as unknown as AnyRecord[];
  const random = rows[Math.floor(Math.random() * rows.length)];
  const profile = asObj(random.profiles);
  const sessionLog = asObj(random.session_logs);
  const preset = asObj(sessionLog.preset_sessions);

  return {
    story_quote: String(random.message ?? "—"),
    story_name: String(profile.username ?? "—"),
    story_sport: String(preset.sport ?? "—"),
  };
}

async function getMoodduMois() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("session_logs")
    .select("mood")
    .gte("created_at", start)
    .lt("created_at", end)
    .not("mood", "is", null)
    .limit(500);

  if (!data || data.length === 0) {
    return { mood_dominant: "—", mood_dominant_pct: 0 };
  }

  const counts: Record<string, number> = {};
  for (const row of data as AnyRecord[]) {
    const mood = String(row.mood ?? "").toLowerCase();
    counts[mood] = (counts[mood] ?? 0) + 1;
  }

  const total = data.length;
  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const pct = Math.round((topMood[1] / total) * 100);

  return {
    mood_dominant: topMood[0],
    mood_dominant_pct: pct,
  };
}

async function getStreakduMois() {
  const { data } = await supabase
    .from("profiles")
    .select("username, streak")
    .order("streak", { ascending: false })
    .limit(1);

  if (!data || data.length === 0) {
    return { streak_username: "—", streak_jours: 0 };
  }

  const top = data[0] as AnyRecord;
  return {
    streak_username: String(top.username ?? "—"),
    streak_jours: Number(top.streak ?? 0),
  };
}

async function getXPTotal() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("xp_history")
    .select("amount")
    .gte("created_at", start)
    .lt("created_at", end)
    .limit(1000);

  if (!data || data.length === 0) return { xp_total_mois: 0 };

  const total = (data as AnyRecord[]).reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
  return { xp_total_mois: total };
}

async function getPostBuzz() {
  const { start, end } = getMonthRange();

  const { data } = await supabase
    .from("posts")
    .select("id, content, mood, user_id, typologies, profiles(username)")
    .gte("created_at", start)
    .lt("created_at", end)
    .limit(100);

  if (!data || data.length === 0) {
    return { post_buzz_content: "—", post_buzz_username: "—", post_buzz_sport: "—", post_buzz_reactions: 0 };
  }

  const postIds = (data as AnyRecord[]).map((p) => String(p.id));
  const { data: reactions } = await supabase
    .from("post_reactions")
    .select("post_id")
    .in("post_id", postIds);

  const reactionCounts: Record<string, number> = {};
  for (const r of (reactions ?? []) as AnyRecord[]) {
    const id = String(r.post_id ?? "");
    reactionCounts[id] = (reactionCounts[id] ?? 0) + 1;
  }

  const topPost = (data as AnyRecord[]).sort(
    (a, b) => (reactionCounts[String(b.id)] ?? 0) - (reactionCounts[String(a.id)] ?? 0)
  )[0];

  const profile = asObj(topPost.profiles);
  const content = String(topPost.content ?? "—");
  const typologies = Array.isArray(topPost.typologies) ? topPost.typologies[0] : topPost.typologies;

  return {
    post_buzz_content: content.length > 120 ? content.slice(0, 117) + "..." : content,
    post_buzz_username: String(profile.username ?? "—"),
    post_buzz_sport: String(typologies ?? topPost.mood ?? "—"),
    post_buzz_reactions: reactionCounts[String(topPost.id)] ?? 0,
  };
}

// ── Envoi campagne Brevo ─────────────────────────────────────

async function sendBrevoNewsletter(params: Record<string, string | number>) {
  const res = await fetch("https://api.brevo.com/v3/emailCampaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      name: `Newsletter Mood2Fit — ${params.month}`,
      subject: `Mood2Fit · ${params.month} — La commu bouge fort`,
      sender: { name: "Mood2Fit", email: "hello@mood2fit.com" },
      type: "classic",
      templateId: TEMPLATE_ID,
      recipients: { listIds: [BREVO_LIST_ID] },
      params,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Brevo campaign error:", data);
    return { success: false, error: data };
  }

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

    const [stats, badge, challenge, seance, topBadges, story, mood, streak, xp, postBuzz] =
      await Promise.all([
        getStats(),
        getBadgeduMois(),
        getChallengeduMois(),
        getSeanceduMois(),
        getTopBadges(),
        getStoryduMois(),
        getMoodduMois(),
        getStreakduMois(),
        getXPTotal(),
        getPostBuzz(),
      ]);

    const params: Record<string, string | number> = {
      month: getMonthLabel(),

      // Stats hero
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
      challenge_completion_rate: challenge.challenge_completion_rate,
      challenge_nb: challenge.challenge_nb,

      // Séance du mois
      seance_titre: seance.seance_titre,
      seance_type: seance.seance_type,
      seance_duree: seance.seance_duree,
      seance_nb: seance.seance_nb,

      // Top badges (sans sport)
      badge1_name: topBadges.badge1.name,
      badge1_badge: topBadges.badge1.badge,
      badge1_emoji: topBadges.badge1.emoji,
      badge2_name: topBadges.badge2.name,
      badge2_badge: topBadges.badge2.badge,
      badge2_emoji: topBadges.badge2.emoji,
      badge3_name: topBadges.badge3.name,
      badge3_badge: topBadges.badge3.badge,
      badge3_emoji: topBadges.badge3.emoji,

      // Histoire du mois
      story_quote: story.story_quote,
      story_name: story.story_name,
      story_sport: story.story_sport,

      // Mood du mois
      mood_dominant: mood.mood_dominant,
      mood_dominant_pct: mood.mood_dominant_pct,

      // Streak
      streak_username: streak.streak_username,
      streak_jours: streak.streak_jours,

      // XP total
      xp_total_mois: xp.xp_total_mois,

      // Post qui a buzzé
      post_buzz_content: postBuzz.post_buzz_content,
      post_buzz_username: postBuzz.post_buzz_username,
      post_buzz_sport: postBuzz.post_buzz_sport,
      post_buzz_reactions: postBuzz.post_buzz_reactions,
    };

    const result = await sendBrevoNewsletter(params);

    if (!result.success) {
      return NextResponse.json(
        { error: "Erreur envoi campagne Brevo", details: result.error },
        { status: 500 }
      );
    }

    console.log(`Newsletter envoyée — campagne #${result.campaignId}`);
    console.log("===================================");

    return NextResponse.json({ success: true, campaignId: result.campaignId, params });
  } catch (error) {
    console.error("Erreur newsletter-send:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}