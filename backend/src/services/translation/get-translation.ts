import axios from 'axios';
import { LANGUAGE_NOT_FOUND, TEXT_NOT_FOUND } from '../../const/errorCodes';
import logger from '../../utils/logger';

export const getTranslation = async (message: string) => {
	logger.info(`Message: ${message}`);

	const body = {
		text: [removeLanguageSentence(message)],
		target_lang: findLanguage(message),
	};

	if (!body.target_lang) {
		throw new Error(LANGUAGE_NOT_FOUND);
	}

	if (JSON.stringify(body.text) == JSON.stringify([''])) {
		throw new Error(TEXT_NOT_FOUND);
	}

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
			logger.info(`Language: ${languages[i]}`);
			return languageCodes[i];
		}
	}
	logger.info(`Language: undefined`);
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
