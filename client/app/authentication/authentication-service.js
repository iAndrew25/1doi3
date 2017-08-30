import {request} from 'utils/config';

export function login(email, password) {
	return request(`/users/login`, {
		method: 'POST',
		body: JSON.stringify({email, password})
	})
}

export function signup(email, name) {
	return request(`/users/signup`, {
		method: 'POST',
		body: JSON.stringify({email, name})
	})
}