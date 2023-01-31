import { User } from '@prisma/client';
import express from 'express';

export function regenerateSession(req: express.Request, res: express.Response, next: express.NextFunction, user: User) {
	req.session.regenerate(function (err) {
		if (err) next(err);

		req.session.userId = user.id;

		req.session.save(function (err) {
			if (err) next(err);
			return res.status(200).json({ message: 'Session generated' });
		});
	});
}
