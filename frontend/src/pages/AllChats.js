import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatsDesktop from '../components/ChatsDesktop';
import ChatsMobile from '../components/ChatsMobile';
import { AddMessage } from '../store/actions/Chatbot';

function Index() {
	const dispatch = useDispatch();

	const currentChats = useSelector((state) => state.chatState.Chats);
	const currentChatId = useSelector((state) => state.chatState.ChatId);
	const [isMobile, setIsMobile] = useState(true);

	const addMessage = (chatId, message) => {
		dispatch(AddMessage(chatId, message));
	};

	useLayoutEffect(() => {
		document.body.style.overflow = 'hidden';
		function updateSize() {
			setIsMobile(window.innerWidth <= 800);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return (
		<>
			{isMobile ? (
				<ChatsMobile chatData={currentChats} addMessage={addMessage} currentChatId={currentChatId} />
			) : (
				<ChatsDesktop chatData={currentChats} addMessage={addMessage} currentChatId={currentChatId} />
			)}
		</>
	);
}

export default Index;
