import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'content-type': 'application/json',
		'csrf-token': 'cbacb',
	},
	withCredentials: true,
});

const PATH_PREFIX_AUTH = '/auth';
const PATH_PREFIX_MESSAGES = '/messages';

export async function signUserIn(credentials) {
	return await http.post(`${PATH_PREFIX_AUTH}/signin`, credentials);
}

export async function signUserUp(credentials) {
	return await http.post(`${PATH_PREFIX_AUTH}/signup`, credentials);
}

export async function logoutUser() {
	return await http.post(`${PATH_PREFIX_AUTH}/logout`);
}

export async function isAuthenticated() {
	return await http.post(`${PATH_PREFIX_AUTH}/is-authenticated`);
}

export async function deleteAllMessages() {
	return await http.delete(`${PATH_PREFIX_MESSAGES}`);
}
