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

// new collection for team members
const teamCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/team" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			jobTitle: z.string(),
			bio: z.string(),
			image: image(),
			order: z.number().optional(),
		}),
});

// new collection for board members
const boardCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/board" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			jobTitle: z.string(),
			bio: z.string(),
			image: image(),
			order: z.number().optional(),
		}),
});

export const collections = {
  blog: blogsCollection,
  team: teamCollection,
  board: boardCollection
};