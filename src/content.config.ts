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

// founders collection

const foundersCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/founders",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      image: z.string(),
      video: z.string().optional(),
      videoCaption: z.string().optional(),
      order: z.number().optional(),
    }),
});

// about collection
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    pageId: z.string(), // Identifier for the page (about, home, how-we-work, etc.)
    
    // About page fields
    mainContent: z.string().optional(), // For the main text content
    missionTitle: z.string().optional(), // Optional mission title
    missionStatement: z.string().optional(), // Optional mission statement
    missionContent: z.string().optional(), // Optional mission content
    
    // Homepage fields
    reflectionsContent: z.string().optional(), // Reflections content
    currentSupportDesc: z.string().optional(), // Current support description
    pastSupportDesc: z.string().optional(), // Past support description
    
    // How We Work page fields
    howWeWorkIntro: z.string().optional(), // Intro content
    facilitationContent: z.string().optional(), // Facilitation content
    facilitationExamples: z.string().optional(), // Facilitation examples
    networkContent: z.string().optional(), // Network content
    networkExamples: z.string().optional(), // Network examples
    planningContent: z.string().optional(), // Planning content
    planningExamples: z.string().optional(), // Planning examples
  }),
});


// projects collection
const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum([
        "Capacity Building & Technical Assistance",
        "Network Coordination",
        "Strategic & Community-Based Planning",
        "Past Support",
      ]),
      tags: z.array(z.string()),
      image: image(),
      imageAlt: z.string(),
    }),
});


export const collections = {
  blog: blogsCollection,
  team: teamCollection,
  board: boardCollection,
  founders: foundersCollection,
  about: aboutCollection,
  projects: projectsCollection
};