import axios from "axios";

const BASE_URL = "https://jeff-my-wallet.herokuapp.com/";

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

function deleteTransaction(token, id) {
  return axios.delete(`${BASE_URL}/transactions/${id}`, createAuth(token));
}

function updateTransaction(token, id, updatedTransaction) {
  return axios.put(
    `${BASE_URL}/transactions/${id}`,
    updatedTransaction,
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
  updateTransaction,
};

export default api;
