import { Request, Response, NextFunction } from 'express';

export default function csrfVerification(req: Request, res: Response, next: NextFunction) {
	if (req.headers['csrf-token'] !== 'cbacb') {
		res.status(400).end('Missing CSRF verification.');
	}
	next();
}
