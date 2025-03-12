typescript:src/content.config.ts
import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

// Every collection must reflect Decap's config.yml collection schema
// In order to be able to optimize images with Astro built-in compoments, like <Image />, we first must use this image helper 
// Doc: https://docs.astro.build/en/guides/images/#images-in-content-collections

const blogsCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			date: z.date(),
            tags: z.array(z.string()),
			image: image(),
			imageAlt: z.string(),
		}),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/team" }),
  schema: z.object({
    title: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        jobTitle: z.string(),
        bio: z.string(),
        imageUrl: z.string(),
        imageAlt: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  blog: blogsCollection,
  team: teamCollection,
};