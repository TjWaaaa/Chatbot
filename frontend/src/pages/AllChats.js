import React, { useState, useLayoutEffect } from "react";

import ChatsDesktop from "../components/ChatsDesktop";
import ChatsMobile from "../components/ChatsMobile";

import { chatData } from "../demoData/chatDemo";
import { getBotsData } from "../methods/bots";

function Index() {
	const [isMobile, setIsMobile] = useState(true);
	const [chatBotData, setChatBotData] = useState(chatData);

	useLayoutEffect(() => {
		loadChatBotData();
		function updateSize() {
			setIsMobile(window.innerWidth <= 800);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	async function loadChatBotData() {
		const data = await getBotsData();

		setChatBotData(data);
	}

	return <>{isMobile ? <ChatsMobile chatData={chatBotData} /> : <ChatsDesktop chatData={chatBotData} />}</>;
}

export default Index;
