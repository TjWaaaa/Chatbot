import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import helmet from 'helmet';
import wsServer from './ws-server';
import sessionConfig from './configs/session';
import authRouter from './routes/auth';
import { PrismaClient } from '@prisma/client';
import csrfVerification from './middlewares/csrf-verification';
import userRouter from './routes/user';
import messageRouter from './routes/message';

export const prisma = new PrismaClient();

dotenv.config();

const app: Application = express();
app.use(helmet());

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
		credentials: true,
	}),
);
app.use(csrfVerification);

if (app.get('env') === 'production') {
	app.set('trust proxy', 1);
	sessionConfig.cookie.secure = true;
}

app.use(sessionConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Healthy');
});

export const httpServer = createServer(app);

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});

wsServer();
