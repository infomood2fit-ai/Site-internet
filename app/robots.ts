import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // on n'indexe pas les routes API
    },
    sitemap: "https://mood2fit.com/sitemap.xml",
  };
}