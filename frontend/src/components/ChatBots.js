import { useSelector, useDispatch } from 'react-redux';

import { ChangeChatID, ClearChat } from '../store/actions/Chatbot';

function Index({ name, img, text, time, event, id }) {
	const dispatch = useDispatch();

	const currentChatID = useSelector((state) => state.chatState.ChatID);

	const changeChatID = (number) => {
		dispatch(ChangeChatID(number));
	};

	const clearChat = (number) => {
		dispatch(ClearChat(number));
	};

	return (
		<div
			className={'pl-4 pr-4 cursor-pointer ' + (currentChatID === id ? 'bg-indigo-100' : 'bg-white')}
			onClick={() => {
				changeChatID(id);
				clearChat();
				event();
			}}
		>
			<div className="pt-4">
				<div>
					<div className="flex flex-row justify-between">
						<div className="flex flex-row items-center">
							<img src={img} alt="Business Mann 42" className="h-16 w-16 rounded-full" />
							<div className="ml-4 mr-4">
								<h1 className="text-xl font-bold">{name}</h1>
								<h1 className="text max-h-12 overflow-hidden">{text}</h1>
							</div>
						</div>
						<div className="flex flex-row items-center">
							<h1 className="text">{time}</h1>
						</div>
					</div>
				</div>
				<div className="ml-20 mt-4 -mr-4 h-px bg-slate-300" />
			</div>
		</div>
	);
}

export default Index;
