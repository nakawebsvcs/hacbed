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

// team members collection
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

// board members collection
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

// pages collection

const pagesCollection = {
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headerImage: z.string(),
    content: z.string(), // Single content field with all the main text
    services: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        id: z.string(),
        description: z.string(),
        examples: z.string(),
      })
    ),
  }),
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
};

// projects collection

export const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subcategory: z.enum([
      "Capacity Building & Technical Assistance",
      "Network Coordination",
      "Strategic & Community-Based Planning"
    ]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});


export const collections = {
  blog: blogsCollection,
  team: teamCollection,
  board: boardCollection,
  pages: pagesCollection,
  projects: projectsCollection
};