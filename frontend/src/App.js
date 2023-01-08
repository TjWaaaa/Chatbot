import React, { useState } from 'react';
import { socket } from './index';

const App = () => {
	const [input, setInput] = useState('');

	return (
		<div>
			<h1 className="text-3xl font-bold">App.js</h1>
			<input value={input} onChange={(e) => setInput(e.target.value)} />
		</div>
	);
};

export default App;
