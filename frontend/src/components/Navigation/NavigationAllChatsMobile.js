import Settings from '../../pages/Settings';

function Index() {
	return (
		<div data-testid="id1" className="pl-4 pr-4 pt-4 pb-4 bg-white dark:bg-indigo-600 sticky top-0 z-50">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl font-bold dark:text-white">All Chats are Bots</h1>
				<Settings color="text-indigo-600 dark:text-white" />
			</div>
		</div>
	);
}

export default Index;
