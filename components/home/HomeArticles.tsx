"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt_fr: string;
  read: string;
  category: string;
  lang?: string;
};

function Card({ item }: { item: Article }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col cursor-pointer group/card overflow-hidden rounded-2xl relative"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minHeight: "280px",
        textDecoration: "none",
      }}
    >
      {item.image ? (
        <div className="absolute inset-0 z-0">
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0" style={{ background: "#f7f4fb" }} />
      )}

      <div className="relative z-10 flex flex-col h-full p-5 gap-3">
        <div className="flex items-center justify-between">
          <span
            className="font-roboto font-700 text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: item.image ? "rgba(247,37,133,0.85)" : "rgba(247,37,133,0.08)",
              color: item.image ? "#fff" : "#f72585",
            }}
          >
            {item.source}
          </span>
          <div className="flex items-center gap-2">
            {item.lang && (
              <span
                className="font-roboto font-700 text-[13px] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: item.lang === "FR" ? "rgba(0,122,255,0.15)" : "rgba(255,255,255,0.15)",
                  color:
                    item.lang === "FR"
                      ? item.image ? "#fff" : "#007AFF"
                      : item.image ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
                }}
              >
                {item.lang === "FR" ? "🇫🇷" : "🇬🇧"}
              </span>
            )}
            <span
              className="font-roboto text-[11px] font-500"
              style={{ color: item.image ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)" }}
            >
              {item.publishedAt_fr}
            </span>
          </div>
        </div>

        <h3
          className="font-roboto font-700 leading-tight mt-auto transition-colors duration-200"
          style={{ fontSize: "16px", color: item.image ? "#f72585" : "#000" }}
        >
          {item.title}
        </h3>

        <p
          className="font-roboto font-400 leading-relaxed line-clamp-3"
          style={{
            fontSize: "13px",
            color: item.image ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.55)",
          }}
        >
          {item.description}
        </p>

        <div
          className="flex items-center gap-2 pt-3 opacity-70 group-hover/card:opacity-100 transition-all duration-200"
          style={{
            borderTop: `1px solid ${item.image ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          <span
            className="font-roboto font-700 text-[11px] uppercase tracking-[0.1em] group-hover/card:text-[#f72585] transition-colors duration-200"
            style={{ color: item.image ? "#fff" : "rgba(0,0,0,0.4)" }}
          >
            Lire
          </span>
          <ArrowRight
            size={13}
            className="group-hover/card:translate-x-1 transition-all duration-200"
            style={{ color: item.image ? "#fff" : "rgba(0,0,0,0.3)" }}
          />
        </div>
      </div>
    </a>
  );
}

export default function HomeArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data: { articles: Record<string, Article[]> }) => {
        const all: Article[] = Object.values(data.articles).flat();

        const sorted = [...all].sort((a, b) => {
          const parse = (s: string) => {
            const [d, m, y] = s.split("/");
            return new Date(`${y}-${m}-${d}`).getTime();
          };
          return parse(b.publishedAt_fr) - parse(a.publishedAt_fr);
        });

        setArticles(sorted.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <section style={{ background: "#f7f4fb" }} className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        <div className="flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Pour aller<br />
            <span style={{ color: "#f72585" }}>plus loin.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/actualite"
              className="font-roboto font-700 text-xs tracking-[0.15em] uppercase text-black/35 hover:text-black transition-colors duration-200"
            >
              Voir tout →
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card item={article} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}