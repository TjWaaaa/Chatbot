import { NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import express = require('express');

export const validate =
	(schema: AnyZodObject) => async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
			});
			return next();
		} catch (error) {
			return res.status(400).json(error);
		}
	};
