import { z } from 'zod';

export const emailSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'E-Mail ist erforderlich.',
			})
			.email({ message: 'Ungültige E-Mail Adresse.' }),
	}),
});
