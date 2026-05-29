import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL!,
  token: process.env.UPSTASH_KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const data = await redis.get("mood2fit:articles");

    if (!data) {
      return NextResponse.json(
        { error: "Aucun article en cache. Lance d'abord /api/refresh-articles" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lecture Redis:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}