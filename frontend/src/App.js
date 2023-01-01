import React, { useState } from 'react';
import { socket } from './index';

const App = () => {
	const [input, setInput] = useState('');

	socket.on('answer', (answer) => {
		console.log(answer);
		setInput(answer);
	});

	return (
		<div>
			<h1 className="text-3xl font-bold">App.js</h1>
			<input value={input} onChange={(e) => setInput(e.target.value)} />
			<button
				onClick={() => {
					console.log(socket.emit('translator', input));
				}}
			>
				Send Message
			</button>
		</div>
	);
};

export default App;
