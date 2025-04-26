import { defineConfig } from "astro/config";
import remarkExternalLinks from "remark-external-links";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: "https://www.yourwebsite.com", // update me!
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});
