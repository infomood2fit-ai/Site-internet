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

// ── TOUTES LES REQUÊTES FR (15 par catégorie comme le Python) ──
const QUERIES_FR: Record<string, string[]> = {
  humeur: [
    '"motivation sport"', '"motivation musculation"', '"sport bien-etre"',
    '"sport mental"', '"fitness mental"', '"discipline sport"',
    '"routine sport"', '"sport confiance"', '"sport stress"',
    '"activite physique mental"', '"exercice humeur"', '"bien-etre sport"',
    '"sport anxiete"', '"sport dopamine"', '"sport quotidien"',
  ],
  equipe: [
    '"sport en groupe"', '"musculation salle"', '"street workout"',
    '"calisthenics"', '"partenaire sport"', '"cours collectifs fitness"',
    '"running groupe"', '"sport entre amis"', '"communaute fitness"',
    '"bootcamp sport"', '"training collectif"', '"club running"',
    '"duo sport"', '"sport communautaire"', '"sport outdoor groupe"',
  ],
  tendances: [
    '"hyrox"', '"fitness tendance"', '"crossfit"', '"pilates reformer"',
    '"zone 2 cardio"', '"musculation tendance"', '"fitness 2026"',
    '"sport fonctionnel"', '"mobilite sport"', '"entrainement hybride"',
    '"wearable sport"', '"trail running"', '"street workout tendance"',
    '"crossfit France"', '"sport connecte"',
  ],
  sante: [
    '"recuperation musculaire"', '"prevention blessure sport"',
    '"sommeil sport"', '"recuperation active"', '"sante sportif"',
    '"blessure musculation"', '"mobilite articulaire"', '"surentrainement"',
    '"physiotherapie sport"', '"sport sante mentale"',
    '"etirement recuperation"', '"sport inflammation"',
    '"bien-etre sportif"', '"sport longevite"', '"sante fitness"',
  ],
  nutrition: [
    '"nutrition sportif"', '"proteines musculation"', '"creatine sport"',
    '"alimentation sportif"', '"repas pre-entrainement"',
    '"complement alimentaire sport"', '"hydratation sport"',
    '"prise de masse nutrition"', '"whey proteines"', '"nutrition trail"',
    '"alimentation fitness"', '"macros musculation"', '"seche musculation"',
    '"nutrition running"', '"dietetique sportive"',
  ],
  evenements: [
    '"marathon France"', '"trail running France"',
    '"competition street workout"', '"competition calisthenics"',
    '"hyrox France"', '"evenement fitness"', '"competition crossfit"',
    '"spartan race France"', '"fitness festival"', '"challenge fitness"',
    '"semi-marathon"', '"urban trail"',
    '"competition musculation France"', '"course a pied evenement"',
    '"obstacle run France"',
  ],
};

// ── TOUTES LES REQUÊTES EN (15 par catégorie comme le Python) ──
const QUERIES_EN: Record<string, string[]> = {
  humeur: [
    '"fitness motivation"', '"workout motivation"', '"gym motivation"',
    '"mental health fitness"', '"fitness mindset"', '"exercise and mood"',
    '"fitness lifestyle"', '"discipline fitness"', '"fitness transformation"',
    '"active lifestyle"', '"exercise mental health"', '"running motivation"',
    '"fitness goals"', '"healthy habits fitness"', '"sport wellbeing"',
  ],
  equipe: [
    '"workout partner"', '"group fitness"', '"fitness community"',
    '"training partner"', '"running club"', '"street workout community"',
    '"calisthenics community"', '"bootcamp fitness"',
    '"small group training"', '"social fitness"',
    '"outdoor workout group"', '"partner workout"',
    '"fitness meetup"', '"duo workout"', '"gym community"',
  ],
  tendances: [
    '"hyrox"', '"hybrid training"', '"zone 2 training"',
    '"mobility training"', '"pilates reformer"', '"functional fitness"',
    '"fitness trends 2026"', '"strength training trend"',
    '"cold plunge recovery"', '"longevity fitness"',
    '"biohacking fitness"', '"wearable fitness"',
    '"street workout trend"', '"crossfit trends"', '"wellness trends"',
  ],
  sante: [
    '"muscle recovery"', '"injury prevention fitness"',
    '"active recovery"', '"sleep and recovery"', '"mobility exercises"',
    '"foam rolling"', '"overtraining symptoms"', '"athlete recovery"',
    '"recovery habits"', '"joint mobility"', '"yoga recovery"',
    '"fitness fatigue"', '"sports physiotherapy"',
    '"cold therapy fitness"', '"recovery workout"',
  ],
  nutrition: [
    '"sports nutrition"', '"protein intake fitness"',
    '"meal prep fitness"', '"pre workout nutrition"',
    '"post workout meal"', '"creatine benefits"', '"hydration fitness"',
    '"muscle gain nutrition"', '"fitness recipes"', '"high protein diet"',
    '"macros fitness"', '"electrolytes running"',
    '"anti inflammatory foods fitness"', '"fitness nutrition"',
    '"nutrition for recovery"',
  ],
  evenements: [
    '"hyrox competition"', '"trail running event"',
    '"street workout competition"', '"calisthenics competition"',
    '"community run"', '"fitness challenge"', '"obstacle race"',
    '"spartan race"', '"running festival"',
    '"functional fitness competition"', '"marathon training"',
    '"wellness festival"', '"urban running event"',
    '"fitness expo"', '"crossfit games"',
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt_fr: string;
  read: string;
  category: string;
  lang: string;
}

// ── FETCH NEWSAPI ──────────────────────────────────────────────
async function fetchNewsAPI(
  catId: string,
  queries: string[],
  language: string,
  langTag: string,
  count: number
): Promise<Article[]> {
  const results: Article[] = [];
  const seenUrls = new Set<string>();
  const pool = shuffle(queries).slice(0, 3); // 3 queries max comme le Python

  for (const query of pool) {
    if (results.length >= count) break;
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt&pageSize=10&apiKey=${NEWSAPI_KEY}`;
      const res = await fetch(url, { next: { revalidate: 0 } });
      const data = await res.json();

      if (data.status !== "ok") {
        console.warn(`NewsAPI warning [${catId}/${langTag}]: ${data.message || "unknown error"}`);
        continue;
      }

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
      await sleep(500); // respecte les rate limits comme le Python
    } catch (e) {
      console.error(`NewsAPI error [${catId}/${langTag}]:`, e);
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
): Promise<Article[]> {
  const results: Article[] = [];
  const seenUrls = new Set<string>();
  const pool = shuffle(queries).slice(0, 3); // 3 queries max comme le Python

  for (const query of pool) {
    if (results.length >= count) break;
    try {
      const q = query.replace(/"/g, "");
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${language}&max=10&sortby=publishedAt&apikey=${GNEWS_KEY}`;
      const res = await fetch(url, { next: { revalidate: 0 } });
      const data = await res.json();

      if (data.errors) {
        console.warn(`GNews warning [${catId}/${langTag}]:`, data.errors);
        continue;
      }

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
      await sleep(1000); // respecte les rate limits comme le Python
    } catch (e) {
      console.error(`GNews error [${catId}/${langTag}]:`, e);
    }
  }
  return results;
}

// ── FETCH PAR CATÉGORIE — cascade complète comme le Python ─────
async function fetchCategory(catId: string): Promise<Article[]> {
  const needed = 6;
  let results: Article[] = [];

  // 1️⃣ NewsAPI FR
  const newsapiFR = await fetchNewsAPI(catId, QUERIES_FR[catId], "fr", "FR", needed);
  results = results.concat(newsapiFR);
  console.log(`  [${catId}] NewsAPI FR: ${newsapiFR.length}`);

  // 2️⃣ GNews FR (si pas assez)
  if (results.length < needed) {
    const gnewsFR = await fetchGNews(catId, QUERIES_FR[catId], "fr", "FR", needed - results.length);
    results = results.concat(gnewsFR);
    console.log(`  [${catId}] GNews FR: ${gnewsFR.length}`);
  }

  // 3️⃣ NewsAPI EN (si pas assez)
  if (results.length < needed) {
    const newsapiEN = await fetchNewsAPI(catId, QUERIES_EN[catId], "en", "ANG", needed - results.length);
    results = results.concat(newsapiEN);
    console.log(`  [${catId}] NewsAPI EN: ${newsapiEN.length}`);
  }

  // 4️⃣ GNews EN (si pas assez)
  if (results.length < needed) {
    const gnewsEN = await fetchGNews(catId, QUERIES_EN[catId], "en", "ANG", needed - results.length);
    results = results.concat(gnewsEN);
    console.log(`  [${catId}] GNews EN: ${gnewsEN.length}`);
  }

  if (results.length === 0) {
    console.error(`  [${catId}] ❌ AUCUN article trouvé`);
  }

  return results.slice(0, needed);
}

// ── HANDLER PRINCIPAL ──────────────────────────────────────────
export async function GET() {
  try {
    console.log("=== REFRESH ARTICLES — Mood2Fit ===");
    const categories = ["humeur", "equipe", "tendances", "sante", "nutrition", "evenements"];
    const articles: Record<string, Article[]> = {};

    for (const catId of categories) {
      console.log(`\n📂 ${catId.toUpperCase()}`);
      articles[catId] = await fetchCategory(catId);

      const nbFR = articles[catId].filter((a) => a.lang === "FR").length;
      const nbEN = articles[catId].filter((a) => a.lang === "ANG").length;
      const status = articles[catId].length === 6 ? "✅" : articles[catId].length > 0 ? "⚠️" : "❌";
      console.log(`  ${status} ${articles[catId].length}/6 [FR:${nbFR} ANG:${nbEN}]`);
    }

    const total = Object.values(articles).reduce((acc, arr) => acc + arr.length, 0);
    const totalFR = Object.values(articles).flat().filter((a) => a.lang === "FR").length;
    const totalEN = Object.values(articles).flat().filter((a) => a.lang === "ANG").length;

    const payload = {
      generatedAt: new Date().toISOString(),
      articles,
    };

    // Stockage dans Upstash Redis — expire après 35 jours
    await redis.set("mood2fit:articles", payload, { ex: 60 * 60 * 24 * 35 });

    console.log(`\n✅ Total: ${total}/36 [FR:${totalFR} ANG:${totalEN}]`);
    console.log("===================================");

    return NextResponse.json({
      success: true,
      message: `${total}/36 articles récupérés et mis en cache`,
      details: Object.fromEntries(
        Object.entries(articles).map(([cat, arts]) => [
          cat,
          {
            total: arts.length,
            fr: arts.filter((a) => a.lang === "FR").length,
            ang: arts.filter((a) => a.lang === "ANG").length,
          },
        ])
      ),
      generatedAt: payload.generatedAt,
    });
  } catch (error) {
    console.error("Erreur refresh-articles:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}