import {
	ADD_MESSAGE,
	INITIALIZE_CHATS,
	CLEAR_CHAT,
	CHAT_ID,
	CONVERSATIONIST_STOPS_TYPING,
	CONVERSATIONIST_STARTS_TYPING,
} from '../actions/Chatbot';

const initialState = {
	Chats: [],
	ChatId: -1,
	Email: '',
	conversationistTyping: false,
};

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			const newChats = state.Chats;
			newChats[action.chatBotType].messages = [...state.Chats[action.chatBotType].messages, action.message];

			return {
				...state,
				Chats: [...newChats],
			};

		case INITIALIZE_CHATS:
			return { ...state, Email: action.email, Chats: [...action.chats] };

		case CLEAR_CHAT:
			return { ...state, Chats: [] };

		case CHAT_ID:
			return { ...state, ChatId: action.chatId };

		case CONVERSATIONIST_STARTS_TYPING:
			return { ...state, conversationistTyping: true };

		case CONVERSATIONIST_STOPS_TYPING:
			return { ...state, conversationistTyping: false };

		default:
			return state;
	}
};

export default chatReducer;
