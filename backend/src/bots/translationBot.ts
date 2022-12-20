import { Socket } from 'socket.io';
var request = require('request');
import { chatBotId } from './botTypes';

export const getTranslation = (message: string, socket: Socket) => {
	console.log(message);

	var options = {
		method: 'POST',
		url: 'https://api-free.deepl.com/v2/translate',
		headers: {
			Authorization: 'DeepL-Auth-Key c2177cb9-06b8-ef5e-84b9-e4925ec1e935:fx',
		},
		formData: {
			text: JSON.stringify(message),
			target_lang: 'EN',
		},
	};
	request(options, function (error: any, response: any) {
		if (error) throw new Error(error);

		const answer = JSON.parse(response.body).translations[0].text.replaceAll('"', '');
		console.log(answer);
		socket.emit('answer', answer, chatBotId.TRANSLATOR);
	});
};

export function findLanguage(input: string) {
	const languages = [
		{ language: 'deutsch', code: 'DE' },
		{ language: 'englisch', code: 'EN' },
		{ language: 'französisch', code: 'FR' },
	];
	for (let i = 0; i < languages.length; i++) {
		if (input.includes(languages[i].language)) {
			return languages[i].code;
		}
	}
	return undefined;
}
export function removeLanguageSentence(input: string) {
	let convertedInput = input.replaceAll('.', '.🔪');
	convertedInput = convertedInput.replaceAll(':', ':🔪');
	convertedInput = convertedInput.replaceAll('?', '?🔪');
	convertedInput = convertedInput.replaceAll('!', '!🔪');

	let sentences = convertedInput.split('🔪');

	let result = '';
	for (let i = 0; i < sentences.length; i++) {
		if (findLanguage(sentences[i]) == undefined) {
			result += sentences[i];
		}
	}
	return result;
}

export function getTranslationBotOnboardingMessages() {
	return [
		{
			bot: true,
			message:
				"Hallo, ich bin ein Dolemtscher in Rente und verdiene mir ein paar Kröten als ChatBot. Frag mich nicht wie ich hier her gekommen bin, sondern was 'Chinesisch ist die einfachste Sprache' auf Japanisch heißt.",
		},
		{
			bot: true,
			message: 'Frag mich einfach: Übersetze mir das ins Englische: Guten Tag.',
		},
		{
			bot: true,
			message: 'Wenn dir das zu umständlich ist schreib einfach: Spanisch. Ich mag Pizza!',
		},
	];
}
