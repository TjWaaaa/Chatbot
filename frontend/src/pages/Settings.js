import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';

import { useNavigate } from 'react-router-dom';
import { logoutUser, deleteAllMessages } from '../utils/api';
import { ClearChats } from '../store/actions/Chatbot';
import { useDispatch } from 'react-redux';
import SettingsButton from '../components/Navigation/SettingsButton';

export default function Settings(props) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const emailAddress = useSelector((state) => state.chatState.Email);

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
				navigate('/login');
				navigate(0);
			})
			.catch((res) => console.log(res.response.data));
	}

	function handleDeleteAllMessages() {
		deleteAllMessages()
			.then(() => {
				setOpen(false);
				dispatch(ClearChats());
			})
			.catch((res) => console.log(res.response.data));
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
						<h2 className="w-full text-center text-md font-medium pb-2.5 truncate">{emailAddress}</h2>
						<ul>
							<li className="flex m-auto border-t hover:text-indigo-600 hover:cursor-pointer">
								<SettingsButton
									text="Verlauf löschen"
									icon={<TrashIcon className="h-7 mr-2.5" />}
									handleClick={handleDeleteAllMessages}
								/>
							</li>
							<li className="flex m-auto border-t hover:text-indigo-600 hover:cursor-pointer">
								<SettingsButton
									text="Ausloggen"
									icon={<ArrowLeftOnRectangleIcon className="h-7 mr-2.5" />}
									handleClick={handleLogout}
								/>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
