import { Link } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

function Index({ name }) {
	return (
		<div className="pl-4 pr-4 pt-4 pb-4 bg-indigo-600 sticky top-0 z-50 h-16">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl font-bold">All Chats</h1>

				<Link to="/settings">
					<Cog6ToothIcon className="flex h-8 w-8 text-white" />
				</Link>
			</div>
		</div>
	);
}

export default Index;
