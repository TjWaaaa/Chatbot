import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import logger from '../../utils/logger';

export async function isPasswordCorrect(password: string, user: User): Promise<boolean> {
	try {
		return await bcrypt.compare(password, user.hashedPassword);
	} catch (err) {
		logger.error(err);
		throw err;
	}
}
