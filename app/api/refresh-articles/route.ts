import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL!,
  token: process.env.UPSTASH_KV_REST_API_TOKEN!,
});

const NEWSAPI_KEY = process.env.NEWSAPI_KEY!;
const GNEWS_KEY = process.env.GNEWS_KEY!;

// ── BLACKLIST / WHITELIST ──────────────────────────────────────
const BLACKLIST = [
  "football", "soccer", "nba", "nfl", "nhl", "tennis", "rugby",
  "betting", "transfer", "ligue 1", "premier league", "champions league",
  "formula 1", "f1", "handball", "volleyball", "psg", "real madrid",
  "barcelona", "juventus", "serie a", "bundesliga", "golf", "cricket",
  "baseball", "hockey", "tour de france", "cyclisme",
];

const WHITELIST = [
  "fitness", "gym", "workout", "running", "crossfit", "hyrox",
  "yoga", "wellness", "musculation", "calisthenics", "street workout",
  "nutrition", "recovery", "training", "sport", "exercise",
  "marathon", "trail", "hiit", "mobility", "strength",
  "récupération", "entrainement", "séance", "sportif", "bien-être",
  "proteines", "salle de sport",
];

// ── REQUÊTES FR ────────────────────────────────────────────────
const QUERIES_FR: Record<string, string[]> = {
  humeur: [
    '"motivation sport"', '"motivation musculation"', '"sport bien-etre"',
    '"sport mental"', '"fitness mental"', '"discipline sport"',
  ],
  equipe: [
    '"sport en groupe"', '"musculation salle"', '"street workout"',
    '"calisthenics"', '"partenaire sport"', '"cours collectifs fitness"',
  ],
  tendances: [
    '"hyrox"', '"fitness tendance"', '"crossfit"', '"pilates reformer"',
    '"zone 2 cardio"', '"musculation tendance"',
  ],
  sante: [
    '"recuperation musculaire"', '"prevention blessure sport"',
    '"sommeil sport"', '"recuperation active"', '"sante sportif"',
  ],
  nutrition: [
    '"nutrition sportif"', '"proteines musculation"', '"creatine sport"',
    '"alimentation sportif"', '"repas pre-entrainement"',
  ],
  evenements: [
    '"marathon France"', '"trail running France"',
    '"competition street workout"', '"hyrox France"', '"evenement fitness"',
  ],
};

// ── REQUÊTES EN ────────────────────────────────────────────────
const QUERIES_EN: Record<string, string[]> = {
  humeur: [
    '"fitness motivation"', '"workout motivation"', '"gym motivation"',
    '"mental health fitness"', '"fitness mindset"',
  ],
  equipe: [
    '"workout partner"', '"group fitness"', '"fitness community"',
    '"training partner"', '"running club"',
  ],
  tendances: [
    '"hyrox"', '"hybrid training"', '"zone 2 training"',
    '"mobility training"', '"fitness trends 2026"',
  ],
  sante: [
    '"muscle recovery"', '"injury prevention fitness"',
    '"active recovery"', '"sleep and recovery"',
  ],
  nutrition: [
    '"sports nutrition"', '"protein intake fitness"',
    '"meal prep fitness"', '"pre workout nutrition"',
  ],
  evenements: [
    '"hyrox competition"', '"trail running event"',
    '"street workout competition"', '"fitness challenge"',
  ],
};

// ── HELPERS ────────────────────────────────────────────────────
function estimateReadTime(text: string): string {
  if (!text) return "3 min";
  const words = text.split(" ").length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function isRelevant(title: string, description: string, source: string): boolean {
  const text = `${title} ${description} ${source}`.toLowerCase();
  for (const word of BLACKLIST) {
    if (text.includes(word)) return false;
  }
  for (const word of WHITELIST) {
    if (text.includes(word)) return true;
  }
  return false;
}

function formatDate(pub: string): string {
  try {
    return new Date(pub).toLocaleDateString("fr-FR");
  } catch {
    return pub?.slice(0, 10) || "";
  }
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── FETCH NEWSAPI ──────────────────────────────────────────────
async function fetchNewsAPI(
  catId: string,
  queries: string[],
  language: string,
  langTag: string,
  count: number
) {
  const results = [];
  const seenUrls = new Set<string>();
  const pool = shuffle(queries).slice(0, 3);

  for (const query of pool) {
    if (results.length >= count) break;
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt&pageSize=10&apiKey=${NEWSAPI_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status !== "ok") continue;

      for (const a of data.articles || []) {
        if (results.length >= count) break;
        if (
          seenUrls.has(a.url) ||
          !a.urlToImage ||
          !a.title ||
          a.title === "[Removed]" ||
          !a.description
        ) continue;
        if (!isRelevant(a.title, a.description, a.source?.name || "")) continue;
        seenUrls.add(a.url);
        results.push({
          id: a.url.slice(-20).replace(/\//g, "_"),
          title: a.title,
          description: (a.description || "").slice(0, 200),
          url: a.url,
          image: a.urlToImage || "",
          source: a.source?.name || "",
          publishedAt_fr: formatDate(a.publishedAt),
          read: estimateReadTime(a.description || ""),
          category: catId,
          lang: langTag,
        });
      }
    } catch (e) {
      console.error("NewsAPI error:", e);
    }
  }
  return results;
}

// ── FETCH GNEWS ────────────────────────────────────────────────
async function fetchGNews(
  catId: string,
  queries: string[],
  language: string,
  langTag: string,
  count: number
) {
  const results = [];
  const seenUrls = new Set<string>();
  const pool = shuffle(queries).slice(0, 3);

  for (const query of pool) {
    if (results.length >= count) break;
    try {
      const q = query.replace(/"/g, "");
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${language}&max=10&sortby=publishedAt&apikey=${GNEWS_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.errors) continue;

      for (const a of data.articles || []) {
        if (results.length >= count) break;
        if (seenUrls.has(a.url) || !a.image || !a.title || !a.description) continue;
        if (!isRelevant(a.title, a.description, a.source?.name || "")) continue;
        seenUrls.add(a.url);
        results.push({
          id: a.url.slice(-20).replace(/\//g, "_"),
          title: a.title,
          description: (a.description || "").slice(0, 200),
          url: a.url,
          image: a.image || "",
          source: a.source?.name || "",
          publishedAt_fr: formatDate(a.publishedAt),
          read: estimateReadTime(a.description || ""),
          category: catId,
          lang: langTag,
        });
      }
    } catch (e) {
      console.error("GNews error:", e);
    }
  }
  return results;
}

// ── FETCH PAR CATÉGORIE ────────────────────────────────────────
async function fetchCategory(catId: string) {
  const needed = 6;
  let results: object[] = [];

  // 1. NewsAPI FR
  results = results.concat(
    await fetchNewsAPI(catId, QUERIES_FR[catId], "fr", "FR", needed - results.length)
  );

  // 2. GNews FR
  if (results.length < needed) {
    results = results.concat(
      await fetchGNews(catId, QUERIES_FR[catId], "fr", "FR", needed - results.length)
    );
  }

  // 3. NewsAPI EN
  if (results.length < needed) {
    results = results.concat(
      await fetchNewsAPI(catId, QUERIES_EN[catId], "en", "ANG", needed - results.length)
    );
  }

  // 4. GNews EN
  if (results.length < needed) {
    results = results.concat(
      await fetchGNews(catId, QUERIES_EN[catId], "en", "ANG", needed - results.length)
    );
  }

  return results.slice(0, needed);
}

// ── HANDLER PRINCIPAL ──────────────────────────────────────────
export async function GET() {
  try {
    const categories = ["humeur", "equipe", "tendances", "sante", "nutrition", "evenements"];
    const articles: Record<string, object[]> = {};

    for (const catId of categories) {
      articles[catId] = await fetchCategory(catId);
      console.log(`✅ ${catId}: ${articles[catId].length}/6 articles`);
    }

    const payload = {
      generatedAt: new Date().toISOString(),
      articles,
    };

    // Stockage dans Upstash Redis (expire après 35 jours)
    await redis.set("mood2fit:articles", payload, { ex: 60 * 60 * 24 * 35 });

    const total = Object.values(articles).reduce((acc, arr) => acc + arr.length, 0);
    return NextResponse.json({
      success: true,
      message: `${total}/36 articles récupérés et mis en cache`,
      generatedAt: payload.generatedAt,
    });
  } catch (error) {
    console.error("Erreur refresh-articles:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}