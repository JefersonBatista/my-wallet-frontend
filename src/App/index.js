import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { Login, SignUp, Transactions, RegisterTransaction } from "../pages";

import { AppContainer } from "./style";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route
              path="/register-transaction/:type"
              element={<RegisterTransaction />}
            />
          </Routes>
        </AppContainer>
      </AuthProvider>
    </BrowserRouter>
  );
}
