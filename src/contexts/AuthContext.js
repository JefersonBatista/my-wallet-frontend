import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const retrievedToken = localStorage.getItem("token");
  const [token, setToken] = useState(retrievedToken);

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  useEffect(() => {
    if (token) {
      navigate("/transactions");
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        setAndPersistToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
