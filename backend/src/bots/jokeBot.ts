import { Socket } from 'socket.io';
var request = require('request');
import { chatBotId } from './botTypes';
export const getJoke = (message: string, socket: Socket) => {
	request('https://witzapi.de/api/joke', (error: any, response: any) => {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body)[0].text;
		socket.emit('answer', answer, chatBotId.JOKE);
	});
};

export function getJokeBotOnboardingMessages() {
	return [
		{
			bot: true,
			message:
				'Hallo, ich bin Moe! Manche würden sagen, ich bin der unlustigste Commedian, den Sie je gesehen haben. Naja immerhin bin ich ein Commedian, oder?',
		},
		{
			bot: true,
			message: 'Frag mich nach nem Witz.',
		},
		{
			bot: true,
			message: 'Komm schon, frag einfach!',
		},
	];
}
