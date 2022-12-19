export const CHAT = "CHAT";
export const CHAT_ID = "CHAT_ID";
export const CLEAR_CHAT = "CLEAR_CHAT";

export const AddChatValue = val => {
  return {type: CHAT, val: val};
};

export const ChangeChatID = val => {
  return {type: CHAT_ID, val: val};
};

export const ClearChat = () => {
  return {type: CLEAR_CHAT};
};
