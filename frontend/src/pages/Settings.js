import React, { useState, useEffect } from 'react';
import { SunIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/api';

export default function Settings(props) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	function handleClickOutside(event) {
		if (event.target.closest('.list-none')) return;
		setOpen(false);
	  }
	
	  useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
		  document.removeEventListener('click', handleClickOutside);
		};
	  }, []);

	  function handleLogout() {
		logoutUser()
			.then(() => {
				navigate('/login'); //todo reload page
				navigate(0)
			})
			.catch((res) => console.log(res.response.data)); //todo handle wrong password and email not found
	}

	return (
		<div>
			<div className="list-none">
				<div
					className="h-11 w-11 overflow-hidden rounded-full cursor-pointer "
					onClick={() => {
						setOpen(!open);
					}}
				>
					<UserCircleIcon className={`flex h-12 w-12 pb-0.5 ${props.color}`} />
				</div>

				{open && (
					<div className="absolute top-20 right-4 bg-white rounded-lg p-3 w-52 shadow-lg">
						<h3 className="w-full text-center text-sm font-small">Angemeldet als:</h3>
						<h2 className="w-full text-center text-md font-medium pb-5">coole.mail@gmx.de</h2>
						<ul>
							<li className="flex m-auto pl-7 p-2.5 border-t hover:text-indigo-600 hover:cursor-pointer">
								<SunIcon className="h-7 mr-2.5" />
								<button>Darkmode</button>
							</li>
							<li className="flex m-auto pl-7 p-2.5 border-t hover:text-indigo-600 hover:cursor-pointer">
								<ArrowLeftOnRectangleIcon className='h-7 mr-2.5'/>
								<button onClick={() => handleLogout()}>Ausloggen</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
