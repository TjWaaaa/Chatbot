import React from 'react';

export default function Input(props) {
	return (
		<div className="flex flex-col text-gray-800 py-2">
			<label className='dark:text-white'>{props.label}</label>
			<input
				className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600 dark:bg-slate-400"
				type={props.type}
				onChange={props.onChange}
				required
			/>
		</div>
	);
}
