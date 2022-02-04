import axios from "axios";

const BASE_URL = "http://localhost:5000";

export async function signUp(newUser) {
  return await axios.post(`${BASE_URL}/sign-up`, newUser);
}

export async function login(login) {
  return await axios.post(`${BASE_URL}/login`, login);
}

export async function logout(token) {
  return await axios.post(
    `${BASE_URL}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function getTransactions(token) {
  return await axios.get(`${BASE_URL}/transactons`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function postTransactions(token, newTransaction) {
  return await axios.post(`${BASE_URL}/transactions`, newTransaction, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
