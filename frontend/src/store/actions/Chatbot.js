export const ADD_MESSAGE = 'ADD_MESSAGE';
export const INITIALIZE_CHATS = 'INITIALIZE_CHATS';
export const CHAT_ID = 'CHAT_ID';
export const INITIALIZE_CHAT = 'INITIALIZE_CHAT';
export const CLEAR_CHATS = 'CLEAR_CHATS';
export const CONVERSATIONIST_STARTS_TYPING = 'CONVERSATIONIST_STARTS_TYPING';
export const CONVERSATIONIST_STOPS_TYPING = 'CONVERSATIONIST_STOPS_TYPING';

export const AddMessage = (chatBotType, message) => {
	return { type: ADD_MESSAGE, chatBotType: chatBotType, message: message };
};

export const InitializeChats = (email, chats) => {
	return { type: INITIALIZE_CHATS, email: email, chats: chats };
};

export const ChangeChatId = (chatId) => {
	return { type: CHAT_ID, chatId: chatId };
};

export const ClearChats = () => {
	return { type: CLEAR_CHATS };
};

export const BotStartsTyping = () => {
	return { type: CONVERSATIONIST_STARTS_TYPING };
};

export const BotStopsTyping = () => {
	return { type: CONVERSATIONIST_STOPS_TYPING };
};
