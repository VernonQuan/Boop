import axios from 'axios';

const tokenKey = 'auth.boopually';

// Todo: refactor for correct catch handling

const setToken = (res) =>
  window.localStorage.setItem(tokenKey, res.data.token);

// Previous code for login
/*export const login = (user) => 
  axios.post('/login', user)
  .then(res => setToken(res));*/

export const login = (user) => 
  axios.post('/login', user)
  .then(function(res) {
    console.log('result is', res);
    setToken(res);
    return res;
  });

export const signup = (user) => 
  axios.post('/register',user)
  .then(res => setToken(res));

export const logout = (user) => 
  window.localStorage.removeItem(tokenKey);

export const getJwt = () => 
  window.localStorage.getItem(tokenKey);
