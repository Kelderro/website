import { defineCollection, z } from 'astro:content';

const DEFAULT_DATE = new Date(0);

export const collections = {
    experience: defineCollection({
        schema: ({ image }) =>
            z.object({
                role: z.string(),
                employer: z.string().optional(),
                employerSite: z.string().optional(),
                department: z.string().optional(),
                description: z.string(),
                impact: z.string().optional(),
                startDate: z.coerce.date().default(DEFAULT_DATE),
                endDate: z.coerce.date().default(DEFAULT_DATE),
                tags: z.array(z.string()),
                img: image().optional(),
                imgAlt: z.string().optional(),
                location: z.string().optional(),
                office: z.string().optional(),
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
