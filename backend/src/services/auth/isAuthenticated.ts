import express from 'express';

export default async (req: express.Request, res: express.Response) => {
	const session = req.session;

	if (session && session.userId) {
		return res.status(200).json({
			message: 'User is authenticated',
		});
	}
	return res.status(401).json({
		message: 'User is not authenticated',
	});
};
