import axios from 'axios';
import logger from '../../utils/logger';

export const getTranslation = async (message: string) => {
	logger.info(`Message: ${message}`);
	console.log(findLanguage(message));
	console.log(removeLanguageSentence(message));

	const body = {
		text: [removeLanguageSentence(message)],
		target_lang: findLanguage(message),
	};

	const headers = {
		headers: {
			Authorization: process.env.DEEPL_AUTH_KEY,
		},
	};

	return axios
		.post('https://api-free.deepl.com/v2/translate', body, headers)
		.then((res) => {
			const answer = res.data.translations[0].text;
			logger.info(`Translation: ${answer}`);
			return answer;
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export function findLanguage(input: string) {
	input = input.toLocaleLowerCase();
	const languages = [
		'deutsch',
		'englisch',
		'französisch',
		'chinesisch',
		'spanisch',
		'italienisch',
		'griechisch',
		'portugisisch',
	];
	const languageCodes = ['DE', 'EN', 'FR', 'CN', 'ES', 'IT', 'GR', 'PT'];

	for (let i = 0; i < languages.length; i++) {
		if (input.includes(languages[i])) {
			return languageCodes[i];
		}
	}
	return undefined;
}
export function removeLanguageSentence(input: string) {
	let convertedInput = input.replaceAll('.', '.🔪');
	convertedInput = convertedInput.replaceAll(':', ':🔪');
	convertedInput = convertedInput.replaceAll('?', '?🔪');
	convertedInput = convertedInput.replaceAll('!', '!🔪');

	const sentences = convertedInput.split('🔪');

	let result = '';
	for (let i = 0; i < sentences.length; i++) {
		if (findLanguage(sentences[i]) == undefined) {
			result += sentences[i];
		}
	}
	return result;
}
