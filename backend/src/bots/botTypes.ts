import { getBusinessBotOnboardingMessages } from './businessBot';
import { getJokeBotOnboardingMessages } from './jokeBot';
import { getTranslationBotOnboardingMessages } from './translationBot';

export enum chatBotId {
	TRANSLATOR = 'translator',
	BUSINESSMAN = 'businessMan',
	JOKE = 'joke',
}

export const getBotPreset = () => {
	return [
		{
			name: 'Business Mann 42',
			img: 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_700,h_700/https://www.corporatephotographerslondon.com/wp-content/uploads/2021/06/professional-LinkedIn-profile-photo-London-1.jpg',
			text: 'Zeit ist Geld, komm zum Punkt!',
			time: 'Gestern',
			type: 'business',
			chatData: getBusinessBotOnboardingMessages(),
		},
		{
			name: 'Der alte Dolmetscher',
			img: 'https://img.fotocommunity.com/aelterer-mann-a688a83e-f251-4ffd-8b89-a7679bbb95ef.jpg?height=1000',
			text: 'Bonne journée! Buenos días!',
			time: 'Gestern',
			type: 'translation',
			chatData: getTranslationBotOnboardingMessages(),
		},
		{
			name: 'Witziger Moe',
			img: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1676&q=80',
			text: 'Was ist grün und steht in der Ecke?',
			time: 'Gestern',
			type: 'joke',
			chatData: getJokeBotOnboardingMessages(),
		},
	];
};
