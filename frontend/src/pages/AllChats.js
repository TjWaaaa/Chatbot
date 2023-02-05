import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatsDesktop from '../components/Chat/ChatsDesktop';
import ChatsMobile from '../components/Chat/ChatsMobile';

import { isAuthenticated } from '../utils/api';
import { AddMessage } from '../store/actions/Chatbot';
import PageLoadingAnimation from '../components/animations/PageLoadingAnimation';

async function checkIsAuthenticated() {
	try {
		let response = await isAuthenticated();
		return response.status;
	} catch (e) {
		const errorMessage = e.response.data;
		console.error(errorMessage);
		return 401;
	}
}

function AllChats() {
	const dispatch = useDispatch();

	const botIsTyping = useSelector((state) => state.chatState.conversationistTyping);
	const currentChats = useSelector((state) => state.chatState.Chats);
	const currentChatId = useSelector((state) => state.chatState.ChatId);
	const [isMobile, setIsMobile] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(undefined);

	const addMessage = (chatBotType, message) => {
		dispatch(AddMessage(chatBotType, message));
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

	useEffect(() => {
		checkAccess();
	}, []);

	async function checkAccess() {
		const status = await checkIsAuthenticated();
		if (status === 200) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
			window.location.href = window.location.href + 'login';
		}
	}
	if (isLoggedIn === undefined) {
		return <PageLoadingAnimation />;
	} else if (isLoggedIn) {
		return (
			<>
				{isMobile ? (
					<ChatsMobile
						chatData={currentChats}
						addMessage={addMessage}
						currentChatId={currentChatId}
						botIsTyping={botIsTyping}
					/>
				) : (
					<ChatsDesktop
						chatData={currentChats}
						addMessage={addMessage}
						currentChatId={currentChatId}
						botIsTyping={botIsTyping}
					/>
				)}
			</>
		);
	} else {
		return <></>;
	}
}

export default AllChats;
