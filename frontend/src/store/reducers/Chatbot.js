import {
  CHAT,
  CLEAR_CHAT,
  CHAT_ID,
  CONVERSATIONIST_STOPS_TYPING,
  CONVERSATIONIST_STARTS_TYPING,
} from '../actions/Chatbot';

const initialState = {
  Chats: [],
  ChatID: -1,
  conversationistTyping: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT:
      return {
        ...state,
        Chats: [...state.Chats, ...action.val],
        conversationistTyping: false,
      };

    case CLEAR_CHAT:
      return { ...state, Chats: [] };

    case CHAT_ID:
      return { ...state, ChatID: action.val };

    case CONVERSATIONIST_STARTS_TYPING:
      return { ...state, conversationistTyping: true };

    case CONVERSATIONIST_STOPS_TYPING:
      return { ...state, conversationistTyping: false };

		default:
			return state;
	}
};

export default chatReducer;
