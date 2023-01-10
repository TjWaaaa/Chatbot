import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signUserIn } from '../utils/api';

export default function SignIn() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	function handleSignIn(e) {
		e.preventDefault();
		signUserIn({ email, password })
			.then(() => {
				navigate('/');
				navigate(0);
				setError(null);
			})
			.catch((res) => {
				const errorMessage = res.response.data;
				setError(errorMessage);
				console.log(errorMessage);
			});
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
							onChange={(e) => setEmail(e.target.value)}
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
					<button
						onClick={handleSignIn}
						className="w-full my-5 py-2 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg"
					>
						Anmelden
					</button>
					<div className="flex justify-center ">
						<p>
							Noch keinen Account?{' '}
							<Link to="/register" className="text-indigo-600">
								Hier registrieren
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
