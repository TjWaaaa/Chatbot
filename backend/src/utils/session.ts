import express from 'express';

interface UserId {
	id: string;
}

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
	req.session.user = null;
	req.session.save(function (err) {
		if (err) next(err);

		req.session.regenerate(function (err) {
			if (err) next(err);
			res.status(200).send('User successfully logged out');
		});
	});
}
