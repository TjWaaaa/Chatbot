import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUserUp } from '../utils/api';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
	const [email, setUserName] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);
	const [passwordMatchError, setPasswortMatchError] = useState(null);
	const [password2, setPassword2] = useState();
	const navigate = useNavigate();

	function handleSignUp(e) {
		e.preventDefault();
		if (password !== password2) {
			setPasswortMatchError("Passwörter stimmen nicht überein");
			return;
		}
		signUserUp({ email, password })
			.then((res) => {
				navigate('/');
				navigate(0)
				setError(null)
				setPasswortMatchError(null)
			})
			.catch((res) => {
				const errorMessage = res.response.data;
				setError(errorMessage);
				console.log(errorMessage);
			});
	}

	return (
		<div className="grid grid-cols-1 h-screen dark:bg-slate-600 w-full">
			<div className="flex flex-col justify-center">
				<form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
					<h2 className="text-4xl dark:text-white font-bold text-center py-6 dark:bg-slate-400 dark:m-10 dark:rounded-lg">
						<div className="flex justify-center">
							<img className="w-20 py-4" src="chatbotLogo.png" alt="" />
						</div>
						<span className="text-slate-900">CHAT</span>
						<span className="text-indigo-600">BOT</span>
					</h2>

					<div className="flex flex-col text-gray-800 dark:text-white py-2">
						<label>E-Mail</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 dark:bg-slate-400 focus:border-indigo-600 dark:text-white"
							type="email"
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col text-gray-800 dark:text-white py-2">
						<label>Passwort</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 dark:bg-slate-400 focus:border-indigo-600 dark:text-white"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col text-gray-800 dark:text-white py-2">
						<label>Passwort wiederholen</label>
						<input
							className="rounded-lg mt-2 p-2 border border-gray-500 dark:bg-slate-400 focus:border-indigo-600 dark:text-white"
							type="password"
							onChange={(e) => setPassword2(e.target.value)}
							required
						></input>
					</div>
					{error &&
						error.issues &&
						error.issues.map((issue) => {
							return (
								<div className="bg-red-100 border border-red-400 text-red-700 px-4 mt-2 pt-2 pb-2 rounded relative ">
									{issue.message}
								</div>
							);
						})}

					{error && error.message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 mt-2 pt-2 pb-2 rounded relative">{error.message}</div>}

					{passwordMatchError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 mt-2 pt-2 pb-2 rounded relative">{passwordMatchError}</div>}
					

					<button
						className="w-full my-5 py-2 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg"
						onClick={handleSignUp}
					>
						Registrieren
					</button>
					<div className="flex justify-center dark:text-white ">
						<p>
							Schon einen Account?{' '}
							<Link to="/login" className="text-indigo-600 dark:text-indigo-300">
								Hier anmelden
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
