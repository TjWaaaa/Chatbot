import { useDispatch } from 'react-redux';
import { AddMessage, BotStartsTyping, BotStopsTyping, InitializeChats } from '../store/actions/Chatbot';
import { socket } from '..';

export default ({ children }) => {
	const dispatch = useDispatch();

	const changeChatValue = (chatBotType, message) => {
		dispatch(AddMessage(chatBotType, message));
	};

	const initializeChat = (chats) => {
		dispatch(InitializeChats(chats));
	};

	const botStopsTyping = () => {
		dispatch(BotStopsTyping());
	};

	const botStartsTyping = () => {
		dispatch(BotStartsTyping());
	};

	socket.on('sendProfileData', (data) => {
		botStopsTyping();
		initializeChat(data.chats);
	});

	socket.on('startsTyping', () => {
		console.log('waiting for answer');
		botStartsTyping();
	});

	socket.on('answer', (answer, chatBotType) => {
		botStopsTyping();
		changeChatValue(chatBotType, {
			sentByUser: false,
			text: answer,
		});
	});

	return children;
};
