import React, { useEffect, useRef, useState } from "react";

import NavigationChat from "../components/NavigationChat";
import MessageBot from "../components/MessageBot";
import MessageBotTyping from "../components/MessageBotTyping";
import MessageUser from "../components/MessageUser";
import InputChat from "../components/InputChat";
import { socket } from "..";

function Index() {
	const [showTypingAnimation, setShowTypingAnimation] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = (message) => {
		setShowTypingAnimation(true);
		setTimeout(() => {
			scrollToBottom();
		}, 200);
		socket.emit("message", message, "businessMan");
	};

	socket.on("answer", (message) => {
		setShowTypingAnimation(false);
		scrollToBottom();
		console.log(message);
	});

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<div className="bg-slate-100 min-h-screen pb-24">
			<NavigationChat
				name="Business Mann 42"
				img="https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_700,h_700/https://www.corporatephotographerslondon.com/wp-content/uploads/2021/06/professional-LinkedIn-profile-photo-London-1.jpg"
			/>
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageUser text="Sanctus est Lorem ipsum dolor sit amet" />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageUser text="Lorem ipsum dolor" />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			<MessageBot text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " />
			{showTypingAnimation ? <MessageBotTyping /> : <></>}
			<InputChat sendMessage={handleSendMessage} />
			<div ref={messagesEndRef} />
		</div>
	);
}

export default Index;
