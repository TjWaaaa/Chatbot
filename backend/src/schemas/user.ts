import { z } from 'zod';

export const userSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email({ message: 'Invalid email address' }),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(8, 'Password must be 8 or more characters long'),
	}),
});
