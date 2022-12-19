import {CHAT, CLEAR_CHAT, CHAT_ID} from "../actions/Chatbot";

const initialState = {
  Chats: [],
  ChatID: -1,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT:
      return {...state, Chats: [...state.Chats, ...action.val]};

    case CLEAR_CHAT:
      return {...state, Chats: []};

    case CHAT_ID:
      return {...state, ChatID: action.val};

    default:
      return state;
  }
};

export default chatReducer;
