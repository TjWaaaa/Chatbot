import pino from 'pino';

export = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});
