import React from 'react';

export default function LogoHeading() {
	return (
		<h2 className="text-4xl dark:text-white font-bold text-center py-6">
			<div className="flex justify-center">
				<img className="w-20 py-4" src="chatbotLogo2.png" alt="" />
			</div>
			<span className="text-slate-900">CHAT</span>
			<span className="text-indigo-600">BOT</span>
		</h2>
	);
}
