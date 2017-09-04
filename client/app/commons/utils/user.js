let user = {};

export const setUser = u => user = Object.assign({}, user, u);
export const getUser = _ => user;