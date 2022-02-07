import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { Login, SignUp, Transactions, TransactionOperations } from "../pages";

import { AppContainer } from "./style";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/transactions">
              <Route path="" element={<Transactions />} />
              <Route
                path=":operation/:type"
                element={<TransactionOperations />}
              />
              <Route
                path=":operation/:type/:id"
                element={<TransactionOperations />}
              />
            </Route>
          </Routes>
        </AppContainer>
      </AuthProvider>
    </BrowserRouter>
  );
}
