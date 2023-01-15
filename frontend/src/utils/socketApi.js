import { useDispatch } from 'react-redux';
import { AddMessage, ConversationistStartsTyping, InitializeChats } from '../store/actions/Chatbot';
import { socket } from '..';

export default ({ children }) => {
	const dispatch = useDispatch();

	const changeChatValue = (chatBotType, message) => {
		dispatch(AddMessage(chatBotType, message));
	};

	const initializeChat = (chats) => {
		dispatch(InitializeChats(chats));
	};

	socket.on('sendProfileData', (data) => {
		initializeChat(data.chats);
	});

	socket.on('startsTyping', () => {
		console.log('waiting for answer');
		ConversationistStartsTyping();
	});

	socket.on('answer', (answer, chatBotType) => {
		changeChatValue(chatBotType, {
			sentByUser: false,
			text: answer,
		});
	});

	return children;
};
