export const setToken = token => localStorage.setItem('auth', token);
export const isTokenSet = _ => localStorage.getItem('auth') !== null;
export const removeToken = _ => localStorage.removeItem('auth');
export const getToken = _ => localStorage.getItem('auth');