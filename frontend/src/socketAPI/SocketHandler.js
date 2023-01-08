import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AddChatValue,
  ConversationistStartsTyping,
} from '../store/actions/Chatbot';
import { socket } from '..';

export default ({ children }) => {
  const dispatch = useDispatch();

  const changeChatValue = (number) => {
    dispatch(AddChatValue(number));
  };

  socket.on('startsTyping', () => {
    console.log('waiting for answer');
    ConversationistStartsTyping();
  });

  socket.on('answer', (answer, chatBotId) => {
    console.log(answer);
    changeChatValue([
      {
        bot: true,
        message: answer,
      },
    ]);
  });

  return children;
};
