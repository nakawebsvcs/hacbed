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
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/team" }),
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
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/board" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      jobTitle: z.string(),
      bio: z.string(),
      image: image(),
      link: z.string().url().optional(),
      order: z.number().optional(),
    }),
});

// pages collection

// Update the pagesCollection definition
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    pageId: z.string(), // Identifier for the page (about, services, etc.)
    mainContent: z.string(), // For the main text content
    missionTitle: z.string().optional(), // Optional mission title
    missionStatement: z.string().optional(), // Optional mission statement
    missionContent: z.string().optional(), // Optional mission content
    // Add other optional content sections as needed for different pages
  }),
});

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