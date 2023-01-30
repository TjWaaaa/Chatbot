import React from 'react';

export default function ErrorMessage(props) {
	return (
		<div className="bg-red-100 border border-red-400 text-red-700 px-4 mt-2 pt-2 pb-2 rounded relative ">
			{props.message}
		</div>
	);
}
