import { useDispatch } from 'react-redux';
import { AddMessage, BotStartsTyping, BotStopsTyping, InitializeChats } from '../store/actions/Chatbot';
import { socket } from '..';

export default ({ children }) => {
	const dispatch = useDispatch();

	const changeChatValue = (chatBotType, message) => {
		dispatch(AddMessage(chatBotType, message));
	};

	const initializeProfile = (email, chats) => {
		dispatch(InitializeChats(email, chats));
	};

	const botStopsTyping = () => {
		dispatch(BotStopsTyping());
	};

	const botStartsTyping = () => {
		dispatch(BotStartsTyping());
	};

	socket.on('sendProfileData', (data) => {
		console.log(data);
		botStopsTyping();
		initializeProfile(data.email, data.chats);
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
