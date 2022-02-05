import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createAuth(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function signUp(newUser) {
  return await axios.post(`${BASE_URL}/sign-up`, newUser);
}

function login(login) {
  return axios.post(`${BASE_URL}/login`, login);
}

async function logout(token) {
  return await axios.post(`${BASE_URL}/logout`, {}, createAuth(token));
}

async function getTransactions(token) {
  return await axios.get(`${BASE_URL}/transactons`, createAuth(token));
}

async function postTransactions(token, newTransaction) {
  return await axios.post(
    `${BASE_URL}/transactions`,
    newTransaction,
    createAuth(token)
  );
}

const api = {
  signUp,
  login,
  logout,
  getTransactions,
  postTransactions,
};

export default api;
