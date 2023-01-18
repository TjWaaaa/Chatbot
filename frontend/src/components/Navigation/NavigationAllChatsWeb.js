import Settings from '../../pages/Settings';

function Index() {
	return (
		<div data-testid="id1" className="pl-4 pr-4 pb-4 bg-indigo-600 sticky top-0 z-50 h-16">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl pt-2 font-semibold text-white">All Chats are Bots</h1>
				<div className="pt-2.5">
					<Settings color="text-white"></Settings>
				</div>
			</div>
		</div>
	);
}

export default Index;
