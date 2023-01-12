import React from 'react';
import { useDispatch } from 'react-redux';
import { AddChatValue, ConversationistStartsTyping, InitializeChat } from '../store/actions/Chatbot';
import { socket } from '..';

export default ({ children }) => {
	const dispatch = useDispatch();

	const changeChatValue = (number) => {
		dispatch(AddChatValue(number));
	};

	const initializeChatValue = (chats) => {
		dispatch(InitializeChat(chats));
	};

	socket.on('sendProfileData', (data) => {
		console.log(data.email, data.chats);
		initializeChatValue(data.chats);
	});

	socket.on('startsTyping', () => {
		console.log('waiting for answer');
		ConversationistStartsTyping();
	});

	socket.on('answer', (answer, chatBotId) => {
		changeChatValue([
			{
				bot: true,
				message: answer,
			},
		]);
	});

	return children;
};
