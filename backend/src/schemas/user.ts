import { z } from 'zod';

export const userSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'E-Mail ist erforderlich.',
			})
			.email({ message: 'Ungültige E-Mail Adresse.' }),
		password: z
			.string({
				required_error: 'Passwort ist erforderlich.',
			})
			.min(8, 'Das Passwort muss 8 oder mehr Zeichen lang sein.'),
	}),
});
