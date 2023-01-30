import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/Login/ErrorMessage';
import Input from '../components/Login/Input';
import LogoHeading from '../components/Login/LogoHeading';
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
		<div className="grid grid-cols-1 dark:bg-slate-600 h-screen w-full">
			<div className="flex flex-col justify-center">
				<form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
					<LogoHeading />
					<Input label="E-Mail" type="email" onChange={(e) => setEmail(e.target.value)}></Input>
					<Input label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)}></Input>
					{error &&
						error.issues &&
						error.issues.map((issue) => {
							return <ErrorMessage message={issue.message}></ErrorMessage>;
						})}

					{error && error.message && (
						<ErrorMessage message={error.message}></ErrorMessage>
					)}
					<button
						onClick={handleSignIn}
						className="w-full my-5 py-2 bg-indigo-600 shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/40 text-white font-semibold rounded-lg"
					>
						Anmelden
					</button>
					<div className="flex justify-center dark:text-white ">
						<p>
							Noch keinen Account?{' '}
							<Link to="/register" className="text-indigo-600 dark:text-indigo-300">
								Hier registrieren
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
