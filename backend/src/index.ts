import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

dotenv.config();

io.on('connection', (socket: Socket) => {
	console.log('A user connected');

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});
});

app.use(cors({ origin: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Healthy');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
