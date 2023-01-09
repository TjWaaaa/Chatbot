import Settings from '../pages/Settings';

function Index() {
	return (
		<div className="pl-4 pr-4 pt-8 pb-4 bg-white sticky top-0 z-50">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl font-bold">All Chats</h1>
				<Settings color="text-indigo-600"/>
				
			</div>
		</div>
	);
}

export default Index;
