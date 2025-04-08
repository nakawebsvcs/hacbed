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

// home page collection
const homeCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/home" }),
  schema: z.object({
    pageId: z.string(), // Identifier for the page
    firstParagraphContent: z.string(), // First paragraph content above mission statement
    currentSupportDesc: z.string(), // Current support description
    pastSupportDesc: z.string(), // Past support description
    missionStatement: z.string(), // Mission statement
    whereWeStartedContent: z.string(), // Where We Started content
    whereWeAreContent: z.string(), // Where We Are content
    whereWeSeeOurselvesContent: z.string(), // Where We See Ourselves content
    whereWeWantToGoContent: z.string(), // Where We Want To Go content
    finalParagraphTitle: z.string(), // Reflections title
    finalParagraphContent: z.string(), // Serving Hawaii for 30 Years content
  }),
});

const howWeWorkCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/how-we-work",
  }),
  schema: z.object({
    pageId: z.string(), // Identifier for the page
    howWeWorkIntro: z.string(), // Introduction content
    facilitationContent: z.string(), // Facilitation section content
    facilitationExamples: z.string(), // Facilitation examples
    networkContent: z.string(), // Network coordination content
    networkExamples: z.string(), // Network examples
    planningContent: z.string(), // Strategic planning content
    planningExamples: z.string(), // Planning examples
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
      partners: z
        .array(
          z.object({
            image: z.string(),
            link: z.string().optional(),
          })
        )
        .optional(),
    }),
});


export const collections = {
  blog: blogsCollection,
  team: teamCollection,
  board: boardCollection,
  founders: foundersCollection,
  home: homeCollection,
  howWeWork: howWeWorkCollection,
  projects: projectsCollection,
};