import axios from 'axios';

const http = axios.create({
	baseURL: process.env.BASE_URL_API_PATH,
	headers: {
		'content-type': 'application/json',
		'csrf-token': 'cbacb',
	},
	withCredentials: true,
});

const PATH_PREFIX_AUTH = '/auth';

export async function signUserIn(credentials) {
	return await http.post(`${PATH_PREFIX_AUTH}/login`, credentials);
}

export async function signUserUp(credentials) {
	return await http.post(`${PATH_PREFIX_AUTH}/signup`, credentials);
}
