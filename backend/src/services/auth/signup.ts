import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '~/utils/logger';
import { regenerateSession } from './session';
import { prisma } from '~/index';
import { chatIds, chatOnboardingData } from '~/chatOnboardingData';

const SALT_ROUNDS = 10;

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			return res.status(400).json({
				message: 'Ein Benutzer mit dieser E-Mail Adresse existiert bereits. Bitte melde dich an.',
			});
		}

		bcrypt.hash(password, SALT_ROUNDS, async function (err, hashedPassword: string) {
			if (err) {
				return next(err);
			}

			const newUser = await prisma.user.create({
				data: {
					email: req.body.email,
					hashedPassword,
				},
			});

			logger.info(newUser.id);

			for (const chat of chatOnboardingData) {
				await prisma.chat.create({
					data: {
						chatBotType: chat.chatBotType,
						userId: newUser.id,
						messages: {
							createMany: {
								data: chat.messages,
							},
						},
					},
				});
			}

			logger.info(`User ${newUser.id} created`);
			regenerateSession(req, res, next, newUser);
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Die Registierung ist fehlgeschlagen. Versuche es erneut oder kontaktiere den Support.',
		});
	}
};
