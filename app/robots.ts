import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep admin, API and internal routes out of search results
      disallow: ["/careers-admin", "/api/", "/coming-soon"],
    },
    sitemap: "https://www.seehratransport.com/sitemap.xml",
    host: "https://www.seehratransport.com",
  };
}
