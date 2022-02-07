import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createAuth(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signUp(newUser) {
  return axios.post(`${BASE_URL}/sign-up`, newUser);
}

function login(login) {
  return axios.post(`${BASE_URL}/login`, login);
}

function logout(token) {
  return axios.post(`${BASE_URL}/logout`, {}, createAuth(token));
}

function getTransactions(token) {
  return axios.get(`${BASE_URL}/transactions`, createAuth(token));
}

function registerTransaction(token, newTransaction) {
  return axios.post(
    `${BASE_URL}/transactions`,
    newTransaction,
    createAuth(token)
  );
}

function deleteTransaction(token, transactionId) {
  return axios.delete(
    `${BASE_URL}/transactions/${transactionId}`,
    createAuth(token)
  );
}

const api = {
  signUp,
  login,
  logout,
  getTransactions,
  registerTransaction,
  deleteTransaction,
};

export default api;
