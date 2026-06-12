import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mood2fit.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/fonctionnalites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/communaute`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/actualite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
    url: `${baseUrl}/apropos`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
    },
    {
    url: `${baseUrl}/cgu`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${baseUrl}/confidentialite`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${baseUrl}/mentions-legales`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
  url: `${baseUrl}/recrutons`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.6,
},
  ];
}