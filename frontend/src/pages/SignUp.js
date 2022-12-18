import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUserUp } from '../utils/api';

export default function SignUp(props) {
	const [email, setUserName] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	function handleSignUp(e) {
		e.preventDefault();
		signUserUp({ email, password })
			.then((res) => {
				navigate('/'); //todo reload page
			})
			.catch((res) => console.log(res.response.data)); //todo handle password/email invalid and user already exists
	}

	return (
		<div className="grid grid-cols-1 h-screen w-full">
			<div className="flex flex-col justify-center">
				<form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
					<h2 className="text-4xl dark:text-white font-bold text-center py-6">
						<div className="flex justify-center">
							<img className="w-20 py-4" src="chatbotLogo.png" alt="" />
						</div>
						<span className="text-slate-900">CHAT</span>
						<span className="text-indigo-600">BOT</span>
					</h2>

					<div className="flex flex-col text-gray-800 py-2">
						<label>E-Mail</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600"
							type="email"
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col text-gray-800 py-2">
						<label>Passwort</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col text-gray-800 py-2">
						<label>Passwort wiederholen</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 focus:border-indigo-600"
							type="password"
							required
						></input>
					</div>
					<button
						className="w-full my-5 py-2 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg"
						onClick={handleSignUp}
					>
						Registrieren
					</button>
				</form>
			</div>
		</div>
	);
}

/*
SignUp.propTypes = {
  setToken: PropTypes.func.isRequired
}
*/
