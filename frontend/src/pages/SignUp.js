import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUserUp } from '../utils/api';
import { Link } from 'react-router-dom';
import LogoHeading from '../components/Login/LogoHeading';
import Input from '../components/Login/Input';
import ErrorMessage from '../components/Login/ErrorMessage';

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
			setError(null)
			setPasswortMatchError("Passwörter stimmen nicht überein");
			return;
		}else{
			setPasswortMatchError(null)
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
	}

	return (
		<div className="grid grid-cols-1 h-screen dark:bg-slate-600 w-full">
			<div className="flex flex-col justify-center">
				<form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg">
					<LogoHeading/>
					<Input label="E-Mail" type="email" onChange={(e) => setUserName(e.target.value)}/>
					<Input label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)}/>
					<Input label="Passwort wiederholen" type="password" onChange={(e) => setPassword2(e.target.value)}/>
					{error &&
						error.issues &&
						error.issues.map((issue) => {
							return (
								<ErrorMessage message={issue.message}/>
							);
						})}

					{error && error.message && <ErrorMessage message={error.message}/>}

					{passwordMatchError && <ErrorMessage message={passwordMatchError}/>}
					

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
