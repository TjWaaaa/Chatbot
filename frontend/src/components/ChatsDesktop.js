import React, { useRef } from "react";
import Chat from "./ChatBots";
import NavigationAllChatsWeb from "./NavigationAllChatsWeb";

import MessageBot from "./MessageBot";
import MessageUser from "./MessageUser";
import MessageBotTyping from "./MessageBotTyping";

import InputChat from "./InputChat";

import { useSelector, useDispatch } from "react-redux";
import { AddChatValue } from "../store/actions/Chatbot";

function Index({ chatData }) {
	const dispatch = useDispatch();

	const currentChats = useSelector((state) => state.chatState.Chats);
	const currentChatID = useSelector((state) => state.chatState.ChatID);

	const changeChatValue = (number) => {
		dispatch(AddChatValue(number));
	};

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<NavigationAllChatsWeb />
			<div className="flex flex-row">
				<div className="w-2xl overflow-y-scroll border-r border-slate-300" style={{ height: "calc(100vh - 60px)" }}>
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
				<div className="bg-slate-100 flex-1 overflow-y-scroll" style={{ height: "calc(100vh - 60px)" }}>
					{currentChats.map((element) => {
						if (element.bot) {
							return <MessageBot img={chatData[currentChatID].img} text={element.message} />;
						}

						return <MessageUser text={element.message} />;
					})}
					<MessageBotTyping img={chatData[currentChatID].img} />
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
							setTimeout(() => {
								scrollToBottom();
							}, 400);
						}}
					/>
					<div ref={messagesEndRef} />
				</div>
			</div>
		</div>
	);
}

export default Index;
