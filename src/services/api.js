import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-wallet-26nd.onrender.com",
});

function createAuth(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signUp(newUser) {
  return instance.post(`/sign-up`, newUser);
}

function login(login) {
  return instance.post(`/login`, login);
}

function logout(token) {
  return instance.post(`/logout`, {}, createAuth(token));
}

function getTransactions(token) {
  return instance.get(`/transactions`, createAuth(token));
}

function getTransactionById(token, id) {
  return instance.get(`/transactions/${id}`, createAuth(token));
}

function registerTransaction(token, newTransaction) {
  return instance.post(`/transactions`, newTransaction, createAuth(token));
}

function deleteTransaction(token, id) {
  return instance.delete(`/transactions/${id}`, createAuth(token));
}

function updateTransaction(token, id, updatedTransaction) {
  return instance.put(
    `/transactions/${id}`,
    updatedTransaction,
    createAuth(token)
  );
}

const api = {
  signUp,
  login,
  logout,
  getTransactions,
  getTransactionById,
  registerTransaction,
  deleteTransaction,
  updateTransaction,
};

export default api;
