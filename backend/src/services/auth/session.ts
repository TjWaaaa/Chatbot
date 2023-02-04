import { PrismaClient, User } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express from 'express';
import session from 'express-session';

const ONE_WEEK = 7 * 1000 * 60 * 60 * 24;

export const sessionOptions = session({
	store: new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: 2 * 60 * 1000, //ms
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
	secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
	saveUninitialized: false,
	cookie: {
		maxAge: ONE_WEEK,
		secure: false,
	},
	resave: false,
});

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

export function destroySession(req: express.Request, res: express.Response, next: express.NextFunction) {
	req.session.userId = undefined;

	req.session.save(function (err) {
		if (err) next(err);

		req.session.regenerate(function (err) {
			if (err) next(err);
			return res.status(200).json({ message: 'Erfolgreich abgemeldet.' });
		});
	});
}
