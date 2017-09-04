import fetch from 'utils/fetch';

export function login(email, password) {
	return fetch(`/users/login`, {
		method: 'POST',
		body: JSON.stringify({email, password})
	})
}

export function signup(email, name) {
	return fetch(`/users/signup`, {
		method: 'POST',
		body: JSON.stringify({email, name})
	})
}//aa - 3wualgpo