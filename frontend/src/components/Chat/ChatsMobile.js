import React, { useRef, useEffect } from 'react';
import Chat from '../ChatBot/ChatBots';
import NavigationAllChatsMobile from '../Navigation/NavigationAllChatsMobile';

import NavigationChat from '../Navigation/NavigationChatDetailMobile';
import MessageBotTypingAnimation from '../animations/MessageBotTypingAnimation';
import MessageBot from '../ChatBot/MessageBot';
import MessageUser from '../ChatBot/MessageUser';
import InputChat from '../ChatBot/InputChat';
import { socket } from '../..';
import { ChangeChatId, BotStartsTyping } from '../../store/actions/Chatbot';
import { useDispatch } from 'react-redux';

function Index({ chatData, addMessage, currentChatId, botIsTyping }) {
	const dispatch = useDispatch();
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const botStartsTyping = () => {
		dispatch(BotStartsTyping());
	};
	const changeChatId = (chatId) => {
		dispatch(ChangeChatId(chatId));
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentChatId]);

	return (
		<>
			{currentChatId === -1 ? (
				<div>
					<div className="bg-slate-100 dark:bg-slate-600 min-h-screen scroll-auto">
						<NavigationAllChatsMobile />
						{chatData.map((element, Index) => {
							return (
								<Chat
									name={element.name}
									img={element.img}
									text={element.messages[element.messages.length - 1].text}
									time={element.time}
									id={Index}
									key={Index}
									event={() => {
										// changeChatValue([...element.chatData]);
									}}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<div className="bg-slate-100 dark:bg-slate-700 min-h-screen pb-24">
					<NavigationChat
						name={chatData[currentChatId].name}
						img={chatData[currentChatId].img}
						event={() => {
							changeChatId(-1);
							//clearChat();
						}}
					/>
					{chatData[currentChatId].messages.map((element, Index) => {
						if (!element.sentByUser) {
							return <MessageBot img={chatData[currentChatId].img} text={element.text} key={Index} />;
						}

						return <MessageUser text={element.text} key={Index} />;
					})}
					{botIsTyping ? <MessageBotTypingAnimation img={chatData[currentChatId].img} /> : <></>}
					<InputChat
						isMobile={true}
						sendMessage={(text) => {
							botStartsTyping();
							addMessage(chatData[currentChatId].chatBotType, {
								text: text,
								sentByUser: true,
								timeStamp: Date.now(),
							});

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
		</>
	);
}

export default Index;
