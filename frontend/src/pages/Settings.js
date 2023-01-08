import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className="list-none">
				<div
					className="h-11 w-11 overflow-hidden rounded-full cursor-pointer "
					onClick={() => {
						setOpen(!open);
					}}
				>
					<img src="settings/account.png" alt="" />
				</div>

				{open && (
					<div className="absolute top-20 right-4 bg-white rounded-lg p-3 w-52 shadow-sm">
						<h3 className="w-full text-center text-sm font-small">Angemeldet als:</h3>
						<h2 className="w-full text-center text-md font-medium pb-5">marvin.pfau@gmx.de</h2>
						<ul>
							<li className="flex m-auto pl-7 p-2.5 border-t hover:text-indigo-600 hover:cursor-pointer">
								<img src="settings/darkmode.png" alt="" className="h-7 mr-2.5" />
								<button>Darkmode</button>
							</li>
							<li className="flex m-auto pl-7 p-2.5 border-t hover:text-indigo-600 hover:cursor-pointer">
								<img src="settings/logout.png" alt="" className="h-7 mr-2.5" />
								<Link to="/login">Ausloggen</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
