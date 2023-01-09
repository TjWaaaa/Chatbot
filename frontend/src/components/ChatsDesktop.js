import React, { useEffect, useRef, useState } from 'react';
import Chat from './ChatBots';
import NavigationAllChatsWeb from './NavigationAllChatsWeb';

import MessageBot from './MessageBot';
import MessageUser from './MessageUser';

import InputChat from './InputChat';

import { useSelector, useDispatch } from 'react-redux';
import { AddChatValue } from '../store/actions/Chatbot';
import { socket } from '..';

function Index({ chatData }) {
	const dispatch = useDispatch();

	const currentChats = useSelector((state) => state.chatState.Chats);
	const currentChatID = useSelector((state) => state.chatState.ChatID);
	const [waitingForMessage, setWaitingForMessage] = useState(false);
	const messagesEndRef = useRef(null);

	const changeChatValue = (number) => {
		dispatch(AddChatValue(number));
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

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
									changeChatValue([...element.chatData]);
								}}
								waitingForMessage={waitingForMessage}
							/>
						);
					})}
				</div>
				<div className="bg-slate-100 flex-1 overflow-y-scroll" style={{ height: 'calc(100vh - 60px)' }}>
					{currentChatID === -1 ? (
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
							{currentChats.map((element) => {
								if (element.bot) {
									return <MessageBot img={chatData[currentChatID].img} text={element.message} />;
								}

								return <MessageUser text={element.message} />;
							})}
							<div className="h-16" />
							<InputChat
								isMobile={false}
								sendMessage={(text) => {
									changeChatValue([
										{
											bot: false,
											message: text,
										},
									]);
									// TODO muss noch angepasst werden !!!11!
									socket.emit('message', { message: text, chatBotId: 'businessMan' });
									setTimeout(() => {
										scrollToBottom();
									}, 400);
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
