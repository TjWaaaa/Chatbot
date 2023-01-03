export const CHAT = 'CHAT';
export const CHAT_ID = 'CHAT_ID';
export const CLEAR_CHAT = 'CLEAR_CHAT';
export const CONVERSATIONIST_STARTS_TYPING = 'CONVERSATIONIST_STARTS_TYPING';
export const CONVERSATIONIST_STOPS_TYPING = 'CONVERSATIONIST_STOPS_TYPING';

export const AddChatValue = (val) => {
  return { type: CHAT, val: val };
};

export const ChangeChatID = (val) => {
  return { type: CHAT_ID, val: val };
};

export const ClearChat = () => {
  return { type: CLEAR_CHAT };
};

export const ConversationistStartsTyping = () => {
  return { type: CONVERSATIONIST_STARTS_TYPING };
};

export const ConversationistStopsTyping = () => {
  return { type: CONVERSATIONIST_STOPS_TYPING };
};
