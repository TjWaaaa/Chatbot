import React from 'react';

export default function LogoHeading() {
	return (
		<h2 className="text-4xl dark:text-white font-bold text-center py-6">
            <div className="justify-center hidden dark:flex">
				<img className="w-20 py-4" src="chatbotLogo2.png" alt="" />
			</div>
			<div className="flex justify-center dark:hidden">
				<img className="w-20 py-4" src="chatbotLogo.png" alt="" />
			</div>
			<span className="text-slate-900">CHAT</span>
			<span className="text-indigo-600 dark:text-indigo-400">BOT</span>
		</h2>
	);
}
