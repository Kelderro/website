import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		schema: z.object({
			role: z.string().optional(),
			employer: z.string().optional(),
			department: z.string().optional(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			location: z.string().optional(),
		}),
	}),
};
