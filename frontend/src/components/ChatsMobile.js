import React, { useRef, useEffect } from 'react';
import Chat from './ChatBots';
import NavigationAllChatsMobile from './NavigationAllChatsMobile';

import NavigationChat from './NavigationChatDetailMobile';
import MessageBot from './MessageBot';
import MessageUser from './MessageUser';
import InputChat from './InputChat';
import { socket } from '..';
import { ChangeChatId } from '../store/actions/Chatbot';
import { useDispatch } from 'react-redux';

function Index({ chatData, addMessage, currentChatId }) {
	const dispatch = useDispatch();
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const changeChatId = (chatId) => {
		dispatch(ChangeChatId(chatId));
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<>
			{currentChatId === -1 ? (
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
									// changeChatValue([...element.chatData]);
								}}
							/>
						);
					})}
				</div>
			) : (
				<div className="bg-slate-100 min-h-screen pb-24">
					<NavigationChat
						name={chatData[currentChatId].name}
						img={chatData[currentChatId].img}
						event={() => {
							changeChatId(-1);
							//clearChat();
						}}
					/>
					{chatData[currentChatId].messages.map((element) => {
						if (!element.sentByUser) {
							return <MessageBot img={chatData[currentChatId].img} text={element.text} />;
						}

						return <MessageUser text={element.text} />;
					})}
					<InputChat
						isMobile={true}
						sendMessage={(text) => {
							addMessage(currentChatId, {
								text: text,
								sentByUser: true,
								timeStamp: Date.now(),
							});
							// TODO muss noch angepasst werden !!!11!
							socket.emit('message', {
								chatBotType: chatData[currentChatId].chatBotType,
								message: text,
							});
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
