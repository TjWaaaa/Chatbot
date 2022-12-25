import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { UserId } from '~/types/session-user-id';

const oneWeek = 7 * 1000 * 60 * 60 * 24;

export const sessionOptions = session({
	store: new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: 2 * 60 * 1000, //ms
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
	secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
	saveUninitialized: false,
	cookie: {
		maxAge: oneWeek,
		secure: false,
	},
	resave: false,
});

export function regenerateSession(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
	user: UserId,
) {
	req.session.regenerate(function (err) {
		if (err) next(err);

		req.session.user = user;

		req.session.save(function (err) {
			if (err) next(err);
			res.status(200).send('Session generated');
		});
	});
}

export function destroySession(req: express.Request, res: express.Response, next: express.NextFunction) {
	req.session.user = undefined;
	req.session.save(function (err) {
		if (err) next(err);

		req.session.regenerate(function (err) {
			if (err) next(err);
			res.status(200).send('User successfully logged out');
		});
	});
}
