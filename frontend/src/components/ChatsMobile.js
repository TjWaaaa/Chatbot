import React, { useRef, useEffect } from 'react';
import Chat from './ChatBots';
import NavigationAllChatsMobile from './NavigationAllChatsMobile';

import NavigationChat from './NavigationChatDetailMobile';
import MessageBot from './MessageBot';
import MessageUser from './MessageUser';
import InputChat from './InputChat';

import { useSelector, useDispatch } from 'react-redux';
import { AddChatValue, ClearChat, ChangeChatID } from '../store/actions/Chatbot';

function Index({ chatData }) {
	const dispatch = useDispatch();

	const currentChats = useSelector((state) => state.chatState.Chats);
	const currentChatID = useSelector((state) => state.chatState.ChatID);

	const changeChatValue = (number) => {
		dispatch(AddChatValue(number));
	};

	const clearChat = (number) => {
		dispatch(ClearChat(number));
	};

	const changeChatID = (number) => {
		dispatch(ChangeChatID(number));
	};

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<>
			{currentChatID === -1 ? (
				<div>
					<NavigationAllChatsMobile />
					{chatData.map((element, Index) => {
						return (
							<Chat
								name={element.name}
								img={element.img}
								text={element.text}
								time={element.time}
								id={Index}
								event={() => {
									changeChatValue([...element.chatData]);
								}}
							/>
						);
					})}
				</div>
			) : (
				<div className="bg-slate-100 min-h-screen pb-24">
					<NavigationChat
						name={chatData[currentChatID].name}
						img={chatData[currentChatID].img}
						event={() => {
							changeChatID(-1);
							clearChat();
						}}
					/>
					{currentChats.map((element) => {
						if (element.bot) {
							return <MessageBot img={chatData[currentChatID].img} text={element.message} />;
						}

						return <MessageUser text={element.message} />;
					})}
					<InputChat
						isMobile={true}
						sendMessage={(text) => {
							changeChatValue([
								{
									bot: false,
									message: text,
								},
							]);
							setTimeout(() => {
								scrollToBottom();
							}, 400);
						}}
					/>
					<div ref={messagesEndRef} />
				</div>
			)}
		</>
	);
}

export default Index;
