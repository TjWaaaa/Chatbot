import { Socket } from 'socket.io';
var request = require('request');
import { chatBotId } from './botTypes';

export const getBusinessAdvice = (message: string, socket: Socket) => {
	const advices = ['Advide 1', 'Advice 2', 'Advide 3'];

	const answer = advices[Math.floor(Math.random() * advices.length)];
	socket.emit('answer', answer, chatBotId.BUSINESSMAN);
};

export function getBusinessBotOnboardingMessages() {
	return [
		{
			bot: true,
			message: 'Hallo, ich bin Unternehmer und Geschäftsführer von 42 Firmen. Alle sind im DAX gelistet.',
		},
		{
			bot: true,
			message: 'Ok, ich weiß das nur 40 Firmen im DAX gelistet sein können, aber ich sage die Wahrheit!',
		},
		{
			bot: true,
			message:
				'Wenn ich dir einen Rat geben soll, frag einfach. Aber bitte schnell, Zeit ist Geld und rate mal, von was ich viel hab.',
		},
	];
}
