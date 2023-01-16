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
	}, [currentChatId]);

	return (
		<div>
			<NavigationAllChatsWeb />
			<div className="flex flex-row">
				<div className="overflow-y-scroll w-96" style={{ height: 'calc(100vh - 60px)' }}>
					{chatData.map((element, Index) => {
						return (
							<Chat
								name={element.name}
								img={element.img}
								text={element.text}
								//text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
								time={element.time}
								id={Index}
								key={Index}
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
							{chatData[currentChatId].messages.map((element, Index) => {
								if (!element.sentByUser) {
									return (
										<MessageBot img={chatData[currentChatId].img} text={element.text} key={Index} />
									);
								}

								return <MessageUser text={element.text} key={Index} />;
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
