import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Index() {
	const [color, setColor] = useState('text-black');

	function handleClick() {
		let i = 0;
		const colors = [
			'text-red-500',
			'text-orange-500',
			'text-yellow-500',
			'text-green-500',
			'text-blue-500',
			'text-indigo-500',
			'text-violet-500',
		];
		setInterval(() => {
			setColor(colors[i]);
			i = (i + 1) % colors.length;
		}, 1000);
	}

	return (
		<div className="pl-4 pr-4 pt-8 pb-4">
			<div>
				<h1 className={`text-3xl font-bold ${color}`} onClick={handleClick}>
					Error 404
				</h1>
				<h2 className="text-lg font-semibold pt-3 pb-5 ">Entschuldigung, diese Seite existiert nicht.</h2>
				<Link
					className="my-5 py-2 p-5 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg"
					to="/"
				>
					Zurück zu den Chats
				</Link>
			</div>
		</div>
	);
}

export default Index;
