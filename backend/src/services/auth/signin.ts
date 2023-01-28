import express from 'express';
import { prisma } from '../../index';
import { signUserIn } from './signUserIn';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(400).json({
				message: 'Es existiert kein Benutzer mit dieser E-Mail Adresse. Bitte registriere dich zuerst.',
			});
		}

		signUserIn(req, res, next, password, user);
	} catch (err) {
		return res.status(400).json({
			message: 'Ein Fehler beim Login ist passiert. Versuche es erneut oder kontaktiere den Support.',
		});
	}
};
