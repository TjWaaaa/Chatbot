import React, { useEffect, useRef, useState } from 'react';
import Chat from './ChatBots';
import NavigationAllChatsWeb from './NavigationAllChatsWeb';
import MessageBot from './MessageBot';
import MessageUser from './MessageUser';
import MessageBotTypingAnimation from './animations/MessageBotTypingAnimation';
import { socket } from '..';
import InputChat from './InputChat';
import { useDispatch } from 'react-redux';
import { BotStartsTyping } from '../store/actions/Chatbot';

function Index({ chatData, addMessage, currentChatId, botIsTyping }) {
	const messagesEndRef = useRef(null);
	const dispatch = useDispatch();
	const botStartsTyping = () => {
		dispatch(BotStartsTyping());
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<div>
			<NavigationAllChatsWeb />
			<div className="flex flex-row">
				<div className="w-2xl overflow-y-scroll" style={{ height: 'calc(100vh - 60px)' }}>
					{chatData.map((element, Index) => {
						return (
							<Chat
								name={element.name}
								img={element.img}
								text={element.text}
								time={element.time}
								id={Index}
								event={() => {
									// addMessage([...element.messages]);
								}}
							/>
						);
					})}
				</div>
				<div className="bg-slate-100 flex-1 overflow-y-scroll" style={{ height: 'calc(100vh - 60px)' }}>
					{currentChatId === -1 ? (
						<div className="flex justify-center h-full items-center">
							<div>
								<div className="flex justify-center">
									<img src="/ChatBotImage.png" alt="logo" className="max-h-60 max-w-60" />
								</div>
								<h2 className="text-center text-2xl font-semibold text-black mt-2 mb-2">
									Willkommen bei CBACB
								</h2>
								<p className="text-center text text-black">
									Wähle einen Chatbot und starte eine Konversation.
								</p>
							</div>
						</div>
					) : (
						<div>
							{chatData[currentChatId].messages.map((element) => {
								if (!element.sentByUser) {
									return <MessageBot img={chatData[currentChatId].img} text={element.text} />;
								}

								return <MessageUser text={element.text} />;
							})}
							{botIsTyping ? <MessageBotTypingAnimation img={chatData[currentChatId].img} /> : <></>}
							<div className="h-16" />
							<InputChat
								isMobile={false}
								sendMessage={(text) => {
									botStartsTyping();
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
									}, 100);
								}}
							/>
							<div ref={messagesEndRef} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Index;
