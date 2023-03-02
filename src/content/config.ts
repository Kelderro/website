import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		schema: z.object({
			role: z.string(),
			employer: z.string().optional(),
			department: z.string().optional(),
			description: z.string(),
			impact: z.string().optional(),
			startDate: z.coerce.date().default(new Date(0)),
			endDate: z.coerce.date().default(new Date(0)),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			location: z.string().optional(),
			employment: z.string(),
			selectedWork: z.boolean().optional().default(false),
		}),
	}),
	learning: defineCollection({
		schema: z.object({
			title: z.string(),
			publishDate: z.coerce.date(),
			cover: z.string(),
			url: z.string(),
			type: z.enum(['book', 'video', 'blog']),
			description: z.string(),
			rating: z.number().default(3),
		}),
	}),
};
