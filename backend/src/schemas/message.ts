import { z } from 'zod';

export const messageSchema = z.object({
	body: z.object({
		text: z.string({
			required_error: 'text ist erforderlich.',
		}),
	}),
});
